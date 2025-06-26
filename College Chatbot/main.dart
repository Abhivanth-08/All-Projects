import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';

void main() {
  runApp(MaterialApp(
    theme: ThemeData(
      fontFamily: "Times New Roman",
    ),
    debugShowCheckedModeBanner: false,
    home: Chatbot(),
  ));
}

class Chatbot extends StatefulWidget {
  const Chatbot({super.key});

  @override
  State<Chatbot> createState() => _ChatbotState();
}

class _ChatbotState extends State<Chatbot> {
  String inpmsg = "";
  var msg = [];
  final TextEditingController _con = TextEditingController();
  final ScrollController _sco = ScrollController();
  //
  //
  String tim(DateTime timestamp) {
    return DateFormat('hh:mm a').format(timestamp);
  }

  //
  //
  void toast(String m, double hei, double fs) {
    MotionToast(
      borderRadius: 10,
      // animationDuration: Duration(microseconds: 1),
      displaySideBar: false,
      // animationCurve: Curves.linear,
      primaryColor: Colors.red.shade400,
      position: MotionToastPosition.top,
      description: Text(
        m,
        style: TextStyle(color: Colors.white, fontSize: fs * 0.11),
      ),
    ).show(context);
  }

  //
  //
  Widget input(double hei, double fs) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: Container(
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.all(Radius.circular(fs))),
        child: TextField(
          controller: _con,
          onChanged: (v) {
            setState(() {
              inpmsg = v;
            });
            print(msg);
          },
          onSubmitted: (v) {
            if (v.isNotEmpty) {
              setState(() {
                inpmsg = v;
                msg.add({
                  "msg": inpmsg,
                  "from": "user",
                  "tim": tim(DateTime.now())
                });
              });
            } else {
              toast("Invalid Input", hei, fs);
            }
            _con.clear();
            Future.delayed(Duration(milliseconds: 100), () {
              scocont();
            });
          },
          decoration: InputDecoration(
              prefixIcon: Icon(
                Icons.message_outlined,
              ),
              hintText: "\tMessage...",
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(fs))),
              suffixIcon: InkWell(
                onTap: () {
                  print(msg);
                  if (inpmsg.isNotEmpty) {
                    setState(() {
                      msg.add({
                        "msg": inpmsg,
                        "from": "user",
                        "tim": tim(DateTime.now())
                      });
                      inpmsg = '';
                    });
                  } else {
                    toast("Invalid Input", hei, fs);
                  }
                  _con.clear();
                  Future.delayed(Duration(milliseconds: 100), () {
                    scocont();
                  });
                },
                splashColor: Colors.blueGrey,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: CircleAvatar(
                    backgroundColor: Colors.blue[200],
                    child: Icon(
                      Icons.send,
                      semanticLabel: "Send",
                    ),
                  ),
                ),
              )),
        ),
      ),
    );
  }

  //
  //
  void scocont() {
    if (_sco.hasClients) {
      _sco.animateTo(_sco.position.maxScrollExtent,
          duration: Duration(seconds: 1), curve: Curves.easeInOut);
    }
  }

  //
  //
  void dispose() {
    _sco.dispose();
    super.dispose();
  }

  //
  //
  @override
  Widget build(BuildContext context) {
    //
    final wid = MediaQuery.of(context).size.width;
    final hei = MediaQuery.of(context).size.height;
    final fs = wid * 0.3;
    //
    return Scaffold(
      backgroundColor: Colors.blue[100],
      appBar: AppBar(
        elevation: 2.5,
        shadowColor: Colors.grey,
        automaticallyImplyLeading: false,
        centerTitle: true,
        toolbarHeight: hei * 0.08,
        flexibleSpace: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.blueAccent, Colors.greenAccent],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight)),
        ),
        title: Text(
          "ChatBot for College",
          style: TextStyle(
              shadows: [
                Shadow(
                  offset: Offset(1, 1), // Horizontal and vertical offset
                  blurRadius: 2.0, // Blur intensity
                  color: Colors.black, // Outline color
                ),
              ],
              fontSize: fs * 0.2,
              fontWeight: FontWeight.w700,
              letterSpacing: 2.0),
        ),
        actions: [
          IconButton(
              splashColor: Colors.black,
              onPressed: () {
                setState(() {
                  msg.clear();
                });
              },
              icon: Icon(
                Icons.delete_outline_outlined,
                shadows: [
                  Shadow(
                    offset: Offset(1, 1), // Horizontal and vertical offset
                    blurRadius: 1.0, // Blur intensity
                    color: Colors.black, // Outline color
                  ),
                ],
              ))
        ],
        foregroundColor: Colors.white,
        backgroundColor: Colors.transparent,
      ),
      body: Column(
        children: [
          SizedBox(
            height: hei * 0.01,
          ),
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                opacity: 0.5,
                image: NetworkImage(
                    "https://www.kpriet.ac.in/asset/frontend/images/logo/logo-full.webp"),
                fit: BoxFit.contain,
              ),
            ),
            height: hei * 0.72,
            width: wid * 0.95,
            child: ListView.builder(
              controller: _sco,
              itemCount: msg.length,
              itemBuilder: (context, ind) {
                return Align(
                  alignment: ind % 2 == 0
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: ind % 2 == 0
                          ? CrossAxisAlignment.end
                          : CrossAxisAlignment.start,
                      children: [
                        Container(
                          constraints: BoxConstraints(maxWidth: wid * 0.7),
                          decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              color: ind % 2 == 0
                                  ? Colors.greenAccent
                                  : Colors.grey[300],
                              borderRadius: BorderRadius.only(
                                  topRight: Radius.circular(20),
                                  topLeft: Radius.circular(20),
                                  bottomRight: ind % 2 == 0
                                      ? Radius.zero
                                      : Radius.circular(20),
                                  bottomLeft: ind % 2 == 0
                                      ? Radius.circular(20)
                                      : Radius.zero)),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12.0, vertical: 8.0),
                          child: Text(
                            msg[ind]["msg"] ?? "",
                            style: TextStyle(
                                fontSize: fs * 0.14,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                        Text(
                          msg[ind]["tim"] ?? "",
                          style: TextStyle(fontSize: fs * 0.1),
                        )
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          SizedBox(
            height: hei * 0.02,
          ),
          input(hei, fs),
        ],
      ),
    );
  }
}
