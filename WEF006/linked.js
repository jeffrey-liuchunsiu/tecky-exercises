function cons(value, next) {
    return {
        value,
        next
    }
}


const head = cons(1, cons(2, cons(3, null)));  // Now head connects to a linked list of item.
function getIndexAt(head, index) {
    let i = 0;
    let item = head;
    while (i < index) {
        if (!item.next) {
            throw new Error("No items at index " + index);
        }
        item = item.next;
        i++;
    }
    return item;
}
console.log(getIndexAt(head, 2));
const newHead = cons(0, head); // The new head item becomes newHead instead of head.
getIndexAt(newHead, 2).next = null // Remove the last item from the linked list.