from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
boston = load_boston()
boston_df = boston.data
target_df = boston.target

# print(boston_df.shape)
# print(target_df.shape)

X_train, X_test, y_train, y_test = train_test_split(
    boston_df, target_df, test_size=0.2, random_state=np.random.randint(10))
# Create Regressor
neigh = KNeighborsRegressor(n_neighbors=20)
neigh.fit(X_train, y_train)
print(neigh.predict(X_test))
print(y_test)
print(neigh.score(X_test, y_test))
