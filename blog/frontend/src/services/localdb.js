export function setItem(keyName, value) {
    window.localStorage.setItem(keyName, JSON.stringify(value));
    let savedItem = getItem(keyName);
    if (savedItem == null) {
      return null;
    } else {
      return savedItem;
    }
  }


  export function getItem(keyName) {
    let item = JSON.parse(window.localStorage.getItem(keyName));
    if (item == null) {
      return null;
    } else {
      return item;
    }
  }
  
  export function deleteItem(keyName) {
    window.localStorage.removeItem(keyName);
  }

  //save array of object to the localstorage
export function setCollection(key, value) {
    let savedItem = getItem(key);
    let response;
  
    //save key-value if key is empty
    if (savedItem == null) {
      return response = setItem(key, [value]);
    } else {
      //add new value to existing key
      savedItem.push(value);
     return response = setItem(key, savedItem);
    }
  }

export default {setItem, deleteItem, getItem, setCollection}