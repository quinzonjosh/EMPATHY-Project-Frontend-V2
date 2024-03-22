import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from network import NeuralNetwork

csv_filename = 'data/Sean.csv'
df = pd.read_csv(csv_filename)

df_no_dupe = df.drop_duplicates(subset="Song")

df_no_dupe.drop(["Song", "Artist", "Genres", "Parent Genres" ], axis=1, inplace=True)

label_encoder = LabelEncoder()
df_no_dupe['Mood']= label_encoder.fit_transform(df_no_dupe["Mood"])

features = df_no_dupe.iloc[:,:-1]
mood = df_no_dupe.iloc[:,-1]
feature_vals = len(features.columns)

X = features.values
y = mood.values

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.3, random_state=42, stratify=y)

n_classes = len(pd.unique(df['Mood']))
network = NeuralNetwork(input_size=(feature_vals,1), learning_rate=0.001, n_classes=n_classes)

network.model.fit(X_train, y_train, epochs=1500, verbose=0)

result = network.model.predict(X_test)

loss, accuracy = network.model.evaluate(X_test, y_test)

print(accuracy)

fn = f"{csv_filename[4:-4]}.h5"
network.model.save(f"save/{fn}", overwrite=True)
print(f"Saved Weights at save/{fn}")

# tfjs.converters.save_keras_model(network.model, "saved_js")

predictions = network.model.predict(X)
loss, accuracy = network.model.evaluate(X, y)
print(accuracy)