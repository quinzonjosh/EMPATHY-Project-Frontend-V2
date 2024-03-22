import pandas as pd

users = ["Aaron", "Arabella", "Janella", "Ron", "Sean", "Tiff"]

for user in users:
    df = pd.read_csv(f"data/{user}.csv")
    columns = df.columns.values.tolist()

    # Removes columns with text (artist, name, gernre, parent genre, mood)
    df_cut = df.drop(df.columns[[0, 1, 3, 4, 13]], axis=1)

    # # Remove the "db" in Loud 
    # df_cut['Loud'] = df['Loud'].str.replace(' db', '')

    # Gets the rows according to emotion 
    for_happy = df["Mood"].isin(["Happy"])
    for_sad = df["Mood"].isin(["Sad"])
    for_angry = df["Mood"].isin(["Angry"])

    # New DFs based on emotion 
    happy_df = df_cut[for_happy]
    sad_df = df_cut[for_sad]
    angry_df = df_cut[for_angry]

    happy_df.min().to_json(f"Happy/{user}_min.json")
    happy_df.max().to_json(f"Happy/{user}_max.json")
    sad_df.min().to_json(f"Sad/{user}_min.json")
    sad_df.max().to_json(f"Sad/{user}_max.json")
    angry_df.min().to_json(f"Angry/{user}_min.json")
    angry_df.max().to_json(f"Angry/{user}_max.json")