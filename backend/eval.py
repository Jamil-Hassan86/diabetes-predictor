# evaluate_model.py
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix, roc_curve, roc_auc_score
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import cross_val_score

# Load the saved model
pipeline = joblib.load('diabetes_predictor_model.pkl')

# Load the data
data = pd.read_csv('./dummy_data.csv')
X = data[['Age', 'Gender', 'Height', 'Weight', 'Ethnicity']]
y = data['Diabetes']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Make predictions on the test data
y_pred = pipeline.predict(X_test)

# Calculate basic metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

# Print results
print("\n===== Model Evaluation Results =====")
print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")

# Print classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Print confusion matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# # Save results to a file
# with open('model_evaluation_results.txt', 'w') as f:
#     f.write(f"Accuracy: {accuracy:.4f}\n")
#     f.write(f"Precision: {precision:.4f}\n")
#     f.write(f"Recall: {recall:.4f}\n")
#     f.write(f"F1 Score: {f1:.4f}\n\n")
#     f.write("Classification Report:\n")
#     f.write(classification_report(y_test, y_pred))
#     f.write("\nConfusion Matrix:\n")
#     f.write(str(confusion_matrix(y_test, y_pred)))
    
# print("\nResults also saved to 'model_evaluation_results.txt'")

from sklearn.metrics import precision_recall_curve

# Get predicted probabilities for the positive class
y_proba = pipeline.predict_proba(X_test)[:, 1]

# ROC Curve
fpr, tpr, _ = roc_curve(y_test, y_proba)
roc_auc = roc_auc_score(y_test, y_proba)

plt.figure(figsize=(12, 5))

# Plot ROC Curve
plt.subplot(1, 2, 1)
plt.plot(fpr, tpr, label=f'AUC = {roc_auc:.2f}', color='darkorange')
plt.plot([0, 1], [0, 1], linestyle='--', color='gray')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend(loc='lower right')

# Precision-Recall Curve
precision_vals, recall_vals, _ = precision_recall_curve(y_test, y_proba)
plt.subplot(1, 2, 2)
plt.plot(recall_vals, precision_vals, color='blue')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')

plt.tight_layout()
plt.show()