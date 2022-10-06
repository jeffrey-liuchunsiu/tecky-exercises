from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
import numpy as np

iris = load_iris()
iris_df = iris.data
target_df = iris.target

# print(iris_df)
# print(target_df)

X_train, X_test, y_train, y_test = train_test_split(
    iris_df, target_df,
    test_size=0.2,
    random_state=np.random.randint(10))
neigh = KNeighborsClassifier(n_neighbors=10)
neigh.fit(X_train, y_train)

result = neigh.predict(X_test)
print(result)
print(y_test)
