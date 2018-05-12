export function arraysEqual(arr1, arr2) {

    arr1 = arr1.sort();
    arr2 = arr2.sort();

    if(arr1.length !== arr2.length)
        return false;
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}