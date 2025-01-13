from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib

data = pd.read_csv('./dummy_data.csv')

X = data[['Age', 'Gender', 'Height', 'Weight', 'Ethnicity']] 
y = data['Diabetes']  


preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['Age', 'Height', 'Weight']),  
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['Gender', 'Ethnicity'])  
    ])

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(max_iter=1000))
])

pipeline.fit(X, y)


joblib.dump(pipeline, 'diabetes_predictor_model.pkl')