const map = new Map();
map.set("key1", "value1");
map.set("key2", 'value2');
map.set('key1', 'value3');// value1 is overwritten after this line.

map.get('key2');
map.get('key3');

map.set('key4', "value1"); // value can be duplicated.


