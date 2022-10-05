def hello_world(name):
    if name == "Gordon":
        print("Hello, {}! Haven't seen for long.".format("Gordon"))
    else:
        print("Hello, {}".format(name))


def hello_world(name):
    if name == "Gordon":
        print(f"Hello, {'Gordon'}! Haven't seen for long.")
    else:
        print(f"Hello, {name}")
