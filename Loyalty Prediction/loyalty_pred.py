import pandas as pd
from sklearn.model_selection import train_test_split
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score as a_s
from sklearn.metrics import confusion_matrix as cm
from sklearn.metrics import recall_score as rs
from sklearn.metrics import precision_score as ps

s="/content/loyal_train_main.csv"

d=pd.read_csv(s)
df=pd.DataFrame(d)
print(df)

df=pd.DataFrame(d)
df['Merchandise Sale + Highest Attendance']=df['Merchandise Sale'] + df['Highest Attendance']
print(df)

avg_msha=df["Merchandise Sale + Highest Attendance"].mean()
print("Average Value of summation of Merchanidse Sale and Highest Attendance: ",avg_msha)

df['loyal_fan_base'] = ((df['Merchandise Sale + Highest Attendance'] >= avg_msha) &
                        (df['Loss'] > max(df['Loss'])/2)).astype(int)

df['prod']=df['Merchandise Sale + Highest Attendance']*df['Loss']

print(df)

plt.figure(figsize=(10, 6))
sns.histplot(df['Merchandise Sale'], bins=10, kde=True)
plt.title('Histogram of Merchandise Sale')
plt.xlabel('Merchandise Sale')
plt.ylabel('Frequency')
plt.show()

# Plot 2: Bar Plot of Merchandise Sale
plt.figure(figsize=(14, 8))
sns.barplot(data=df, x='Team', y='Merchandise Sale')
plt.title('Bar Plot of Merchandise Sale by Team')
plt.xlabel('Team')
plt.ylabel('Merchandise Sale')
plt.xticks(rotation=90)
plt.show()

# Plot 3: Heatmap of Wins and Loss
plt.figure(figsize=(8, 6))
sns.heatmap(data=df[['Wins', 'Loss']].head(20), cmap='coolwarm', annot=True, fmt='d')
plt.title('Heatmap of Wins and Loss')
plt.show()

# Plot 4: Pie Chart of Wins
plt.pie(df['Wins'].head(15), labels=df['Team'].head(15), autopct='%1.1f%%', startangle=140)
plt.title('Pie Chart of Wins by Team')
plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
plt.show()

# Plot 5: Boxplot of Merchandise Sale
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, y='Merchandise Sale')
plt.title('Boxplot of Merchandise Sale')
plt.ylabel('Merchandise Sale')
plt.show()

import matplotlib.pyplot as plt
import seaborn as sns

# Assuming df contains the data for Merchandise Sale, Highest Attendance, and Loss

# Plotting the graph
plt.figure(figsize=(10, 6))

# Scatter plot for Merchandise Sale vs. Loss
sns.scatterplot(data=df, x='Merchandise Sale + Highest Attendance', y='Loss', color='blue', label='Merchandise Sale vs Loss')
plt.show()

#Modelling

X = df.drop(columns=['loyal_fan_base','Team','Merchandise Sale','Highest Attendance','Wins','prod'],axis=1)
y = df['loyal_fan_base']

xtr , xts,ytr , yts = train_test_split(X, y, test_size=0.2, random_state=0)
print("Training Shapes: ",xtr.shape, ytr.shape)
print("Testing Shapes: ",xts.shape, yts.shape)
clf = DecisionTreeClassifier()
clf.fit(xtr, ytr)
pred=clf.predict(xts)
print("X Train: ")
print(xtr)
print("X Test")
print(xts)

#Confusion metrix
print("Accuracy of the Model: ", a_s(yts,pred))
print("Recall of the Model : ",rs(yts,pred))
print("Precision of the Model : ",ps(yts,pred))
print("Confusion Matrix in Array format")
c_m=cm(yts,pred,labels=[0,1])
print(c_m)

sns.heatmap(c_m, annot=True, fmt='.2g', cmap="YlGn", linecolor="brown", linewidths=4)
plt.title("Confusion Matrix")
plt.xlabel("Predicted Value")
plt.ylabel("Actual Value")

#outline DTC
from sklearn import tree
fig=plt.figure(figsize=(20,20))
dtree=tree.plot_tree(clf,feature_names=X.columns,filled=True,fontsize=10)

#output of the code
df['predicted_loyalty'] = clf.predict(X)

most_loyal_team = df.loc[df['predicted_loyalty'] == 1].sort_values(by='prod', ascending=False).iloc[0]

print("Most loyal team based on the model:", most_loyal_team['Team'])

#another input to the model
dat=pd.read_csv('/content/preprocessed ipl main.csv')
df1=pd.DataFrame(dat)
df1

X = df1.drop(columns=['loyal_fan_base','Team','Merchandise Sale','Highest Attendance','Wins','prod'],axis=1)
y = df1['loyal_fan_base']

df1['predicted_loyalty'] = clf.predict(X)
print(df1)
most_loyal_team = df1.loc[df1['predicted_loyalty'] == 1].sort_values(by='prod', ascending=False).iloc[0]
print(most_loyal_team)
print("Most loyal team based on the model:", most_loyal_team['Team'])

import matplotlib.pyplot as plt
import seaborn as sns

# Assuming df contains the data for Merchandise Sale + Highest Attendance and Loss

# Plotting the graph
plt.figure(figsize=(10, 6))

# Scatter plot for Merchandise Sale + Highest Attendance vs. Loss
sns.scatterplot(data=df, x='Merchandise Sale + Highest Attendance', y='Loss', color='blue', label='Merchandise Sale + Highest Attendance vs Loss')

# Finding the indices of the peak Loss values
peak_loss_indices = df[df['Loss'] == df['Loss'].max()].index

# Plotting lines at each peak point of Loss
for index in peak_loss_indices:
    plt.axvline(x=df.loc[index, 'Merchandise Sale + Highest Attendance'], color='red', linestyle='--', label='Peak Loss')

plt.title('Relationship between Merchandise Sale + Highest Attendance and Loss')
plt.xlabel('Merchandise Sale + Highest Attendance')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
