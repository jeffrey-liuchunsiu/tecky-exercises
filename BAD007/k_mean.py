from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
import numpy as np

X, y = make_blobs(n_samples=5000, n_features=2,
                  centers=15, shuffle=True,
                  random_state=np.random.randint(10))

# Visualize it.
plt.scatter(X[:, 0], X[:, 1])
