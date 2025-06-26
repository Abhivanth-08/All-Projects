#ROBOTICS
from pydub import AudioSegment as audseg
from pydub.playback import play
from gtts import gTTS
import speech_recognition as sr
import datetime
import cv2 as c
from gpiozero import Servo
from gpiozero import DistanceSensor as ds
from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep
import random as rm
import csv as cs
import wikipedia as wp
from pyzbar.pyzbar import decode as dec
import pyjokes as pj
from bs4 import BeautifulSoup as bs
import requests as req
import googletrans as g
import RPi.GPIO as gg
import time
from pytesseract import pytesseract

#function to speak

def speak(audio):
    try:
        tts=gTTS(audio)
        tts.save("audio2.mp3")
        file=audseg.from_file("audio2.mp3")
        play(file)
    except:
        pass

#function to wish
    
def wishme():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good Morning!")
 
    elif hour>=12 and hour<18:
        speak("Good Afternoon!")   
 
    else:
        speak("Good Evening!")

#function for voice assistant
        
def va():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        print("Recognizing...")    
        cmd = r.recognize_google(audio)
        print(cmd)
        cmd=cmd.lower()
    except:
        speak("Say that again please...")
        return "None"
    return cmd

#setting up object detection

def objdet():
    speak("inside object detection")
    cap=c.VideoCapture(0)
    cap.set(3,640)
    cap.set(4,480)
    thrs=0.5
    cf="/home/pi/Desktop/Cs project file/namesmain.txt"
    s=open(cf,"r")
    cn=[]
    a=s.readlines()
    for i in a:
        k=i.strip()
        cn.append(k)
    cp="/home/pi/Desktop/Cs project file/ssd_mobilenet_v3_large_coco_2020_01_14>
    wp="/home/pi/Desktop/Cs project file/frozen_inference_graph.pb"
    net=c.dnn_DetectionModel(wp,cp)
    net.setInputSize(320,320)
    net.setInputScale(1.0/ 127.5)
    net.setInputMean((127.5,127.5,127.5))
    net.setInputSwapRB(True)
    a=0
    while True:
        try:
            success,img=cap.read()
            classIds,confs,bbox=net.detect(img,0.5)
            if len(classIds) != 0:
                for classid,conf,box in zip(classIds.flatten(),confs.flatten(),bbox)
                    print(cn[classid-1])
                    c.rectangle(img,box,(0,255,0),2)
                    c.putText(img,cn[classid-1].upper(),(box[0]+10,box[1]+30),
                              c.FONT_HERSHEY_COMPLEX,1,(0,255,0),2)
                    c.putText(img,str(round(conf*100,2)),(box[0]+200,box[1]+30),
                              c.FONT_HERSHEY_COMPLEX,1,(0,256,0),2)
                    print(classIds,bbox)
                    cn[classid-1].lower()
                    if cn[classid-1] != "person":
                        a=1
                        obj=cn[classid-1]
                        percent=round(conf*100,2)
                        speak('''the object is {} and the percentage is
{}'''.format(obj,percent))
                        break
                    else:
                        a=1
                        obj=cn[classid-1]
                        percent=round(conf*100,2)
                        speak('''boss he is a {} and the percentage is
{}'''.format(obj,percent))
                        break
                    if a!=1:
                        speak("object cannot be found")
                        break

        except:
            pass

#setting up color detection

def coldet():
     speak("inside color detection")
    cp=open("//home//pi//Desktop//Cs project file//colormain2.csv","r")
    z=cs.reader(cp)
    img=c.VideoCapture(0)
    img.set(c.CAP_PROP_FRAME_WIDTH,1200)
    img.set(c.CAP_PROP_FRAME_HEIGHT,720)
    _,img=img.read()
    for i in range(0,1):
        h,w,_ =img.shape
        x=int(w/2)
        y=int(h/2)
        pc=img[y,x]
        print(pc)
        c.circle(img,(x,y),5,(255,0,0),3)
        b,g,r=pc
        q=str(r)
        v=str(g)
        h=str(b)
        print(q,v,h)
        for i in z:
             try:
                if z!=[]:
                    if i[3]==q and i[4]==v and i[5]==h:
                        col=i[1]
                        print(i[1])
                        speak("colour found the colour is {}".format(col))
                        a=1
        if a==1:
            speak("colour not found")
            break
    

#function to walk
            
def walk():
    f=PiGPIOFactory()
    k=Servo(16,pin_factory=f)
    p=Servo(26,pin_factory=f)
    k.max()
    p.min()
    for i in range(50):
        k.min()
        sleep(0.1)
        k.max()
        sleep(0.1)
        p.max()
        sleep(0.1)
        p.min()
        sleep(0.1)
    k.max()
    p.min()

# function to check the distance

def chkdist():
    e=17
    t=27
    gg.setmode(gg.BCM)
    gg.setup(t,gg.OUT)
    gg.setup(e,gg.IN)
    gg.output(t,False)
    time.sleep(0.2)
    gg.output(t,True)
    time.sleep(0.00001)
    gg.output(t,False)
    while gg.input(e)==0:
        start=time.time()
    while gg.input(e)==1:
        end=time.time()
        d=(end-start)*34300
        d1=round(d,2)
    return d1
    

# setting up tag recognition

def bardet():
    speak("inside code detection")
    cap=c.VideoCapture(0)
    a=0
    while a!=1:
        _,img=cap.read()
        for i in dec(img):
            a=1
            types=i.type
            data=i.data.decode()
            speak('''the type of code is {} and the data in the code is
{}'''.format(types,data))

#function to tell joke

def jokes():
    a=pj.get_joke("en")
    speak(a)

#function to tell climate

def getclimate(place):
    s="weather in"+str(place)
    url="https://www.google.com/search?q={}".format(s)
    r=req.get(url)
    d=bs(r.text,"html.parser")
    temp=d.find("div","BNeawe").text
    if len(temp)>5:
        for i in temp.split():
            if "°C" in i:
                temp=i
                break
    if "−" in temp:
        temp=temp.replace("−","-")
    else:
        temp=temp[0:2]
    temp=eval(temp)
    if -11>temp>=-17:
        cli="frigid climate"
    elif -7>temp>=-10:
        cli="very cold climate"
    elif 1>temp>=-6:
        cli="cold climate"
    elif 5>temp>=0:
        cli="water freezing climate"
    elif 11>temp>=4:
        cli="cool climate"
    elif 16>temp>=10:
        cli="mild climate"
    elif 23>temp>=15:
        cli="warm climate"
    elif 33>temp>=22:
        cli="hot climate"
    elif 38>temp>=32:
        cli="very hot climate"
    elif temp>=37:
        cli="heat waves climate"
    print(''' the temperature in {} is {} degree celsius and the climate
is {}'''.format(place,temp,cli))

#function to translate

def translate(sent,lang):
    speak("inside translation")
    trans=g.Translator()
    s=open("/home/pi/Desktop/Cs project file/langfake.txt","r")
    a=s.readlines()
    dic={}
    for i in a:
        k=i.split()
        p={k[0].lower():k[1].lower()}
        dic.update(p)
    q=trans.translate(sent,dic[lang])
    txt=q.text
    speak("the given text is {} and it is translated to {} and text is {}".format(sent,lang,q.text))

#image text recognition

def imgrec():
     while True:
        cap=c.VideoCapture(0)
        _,img=cap.read()
        data=pytesseract.image_to_data(img)
        if data!="":
            break
     mainlist=[]
     for x,b in enumerate(data.splitlines()):
        if x!=0:
            b=b.split()
            if len(b)==12:
                  mainlist.append(b[11])
     return mainlist

def maintextrec():
     speak("inside text detection recognizing")
     while True:
         a=imgrec()
         if a!=[]:
             break
     print(a)
     speak("the words are".format(str(a)))

#qna

def qna(s):
    try:
        speak("searching")
        res=wp.summary(s,2)
        speak(res)
    except:
        url="https://www.google.com/search?q={}".format(s)
        r=req.get(url)
        d=bs(r.text,"html.parser")
        res=d.find("div","BNeawe").text
        speak(res)

#program starts

wishme()
speak(''' hi sir , how's the day going i am Alex , a programmed robot ,
i can do several work such as
i can act as a voice assistant
i can detect the object that is located around 50 cm
i can also detect the colour of the object that is located around 50 cm
i can get you to know the meaning of anyword
i can decode a QR code or a BAR code
i can walk
i can recognize the text present in the image
i can say the climate of place given
i can translate the given sentence to the language you want
i can answer the questions you ask
i can say some informations about popular celebrities
and i can still be updated to perform more activities''')

hiw=["hi sir","hi sir how's the day going","hi sir thank you for using me sir",
    "hello sir nice to see you"]
byew=["bye sir have a good day","bye sir had a great time with you!",
      "bye sir,thank you for using me sir","bye sir,enjoy your day"]

while True:
    cmd=va().lower()
    if "walk" in cmd:
        speak("yess boss walking")
        sleep(2)
        walk()

    elif "name" in cmd:
        speak("my name is alexa")

    elif "work" in cmd:
        speak("yes boss walking")
        sleep(2)
        walk()
        
    elif "hai" in cmd:
        a=rm.choice(hiw)
        speak(a)

    elif "decode" in cmd:
        bardet()
        sleep(1.5)

    elif "distance" in cmd:
        a=chkdist()
        speak("the distance between the object and me is ",a*100)

    elif "object" in cmd:
        if chkdist() < 50.99:
            objdet()
            sleep(5)
        else:
            speak('''sir please keep the object near 50 cm so
that i can detect the object''')
        
    elif "colour" in cmd:
        if chkdist(1) < 50.99:
            coldet()
            sleep(5)
        else:
            speak('''sir please keep the object near 50 cm so
that i can detect the colour of the object''')

    elif "other work" in cmd:
        speak('''sorry sir i have programmed to do only the
works i said when i got switched on''')
        
    elif "search" in cmd:
        try:
            speak("searching")
            cmd=cmd.replace("search","")
            res=wp.summary(cmd,2)
            speak(res)
        except:
            speak("sorry sir wikipedia page not found")

    elif "what" in cmd:
        qna(cmd)

    elif "who" in cmd:
        qna(cmd)
        
    elif "joke" in cmd:
        jokes()
        sleep(1)

    elif "climate" in cmd:
        cmd=cmd.replace("climate","")
        getclimate(cmd)
        sleep(2)

    elif "translate" in cmd:
        cmd=cmd.replace("translate","")
        speak("ok say me the sentence")
        cmd2=va().lower()
        cmd3=translate(cmd2,cmd.strip())

    elif "text" in cmd:
        maintextrec()
        sleep(2)

    elif "bye" in cmd:
        q=rm.choice(byew)
        speak(q)
        break

    else:
        speak("say that again please")
    
