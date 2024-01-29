function countZeroes(arr) {
  let firstZero = findFirst(arr);
  //  This function counts all the zeros in the array using binary implementation
  if (firstZero === -1) return 0;
  // if there is no zero, then we return 0 zeros

  return arr.length - firstZero;
  // otherwise, we return the number of zeros in the array, by subtracting the array length index by the index
  // of the first 0 since all zeros are after the 1 in these types of arrays
}

function findFirst(arr, low = 0, high = arr.length - 1) {
  // params are the actual array, and the indices of the lowest and highest elements
  if (high >= low) {
    // could also be a while loop
    let mid = low + Math.floor((high - low) / 2);
    // the mid is calculated by flooring the average of the high and low indices
    if ((mid === 0 || arr[mid - 1] === 1) && arr[mid] === 0) {
      //  if the mid is zero, there is only one number in the array
      //  or we can look to see if the mid's value is zero
      // and the value of the index before it is 1. In this case, that zero would be th first zero
      return mid;
      // we  return the middle index
    } else if (arr[mid] === 1) {
      // if the value of the mid is 1, then we call the function again, but instead of starting at
      // the low we divided the
      // array in two and are only looking at the right side of the array going up to the high
      return findFirst(arr, mid + 1, high);
    }
    return findFirst(arr, low, mid - 1);
    // if the arr[mid] is not 1, then it is 0 which means the high would now be mid-1, since we are now looking
    // at only the left side of the original array
    return -1;
    // if after all of that, the low is greater than the high, then there are no zeros in the array
  }
}

module.exports = countZeroes;
// what is this?
// Given a sorted array and a number, write a
// function called sortedFrequency that counts
//  the occurrences of the number in the array
function sortedFrequency(arr, num) {
  let firstIdx = findFirst(arr, num);
  if (firstIdx === -1) return firstIdx;
  let lastIdx = findLast(arr, num);
  return lastIdx - firstIdx + 1;
}

function findFirst(arr, num, low = 0, high = arr.length - 1) {
  // this is similar function used in the countZeros function,
  // we are dividing the array in half and finding the first index of num
  // the array is sorted so it is easy
  if (high >= low) {
    let mid = Math.floor((low + high) / 2);
    // the mid is the average of the low and the high
    if ((mid === 0 || num > arr[mid - 1]) && arr[mid] === num) {
      return mid;
      // if there is one number in the array or the number before the mid's value is less
      // than the mid's value and the value of the mid equals the num, then we return the mid
    } else if (num > arr[mid]) {
      // if the number is greater than the mid
      return findFirst(arr, num, mid + 1, high);
      // we call the function again but divide the array in half and the new low is the mid plus 1
      // the high obviously remains the same
    } else {
      return findFirst(arr, num, low, mid - 1);
      // otherwise we call the function again, but this time, the high will be the index right before the mid
      // we divided the initial array in half
    }
  }
  return -1;
  // if after all of this, there is no num in the array, we return -1
}

function findLast(arr, num, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = Math.floor((low + high) / 2);
    if ((mid === arr.length - 1 || num < arr[mid + 1]) && arr[mid] === num) {
      return mid;
      // if there is only one element in the array, or the number before the mid's value as well as the mid's value
      // equals the num, we then return the mid---Don't understand!!!!
    } else if (num < arr[mid]) {
      // if the num is less than the mid's value
      return findLast(arr, num, low, mid - 1);
      // we call the function again, and set the high to the index before the mid, this divides the array in two
    } else {
      return findLast(arr, num, mid + 1, high);
      // otherwise, when we call the function again we divide the array, but look at the second half of it
    }
  }
}
return -1;
// }if after all of this, there is no num in the array, we return -1

// findRotatedIndex
// Write a function called findRotatedIndex which accepts a rotated array of
// sorted numbers and an integer. The function should return
// the index of num in the array. If the value is not found, return -1.
// Constraints:
// Time Complexity: O(log N)
// Examples:
// findRotatedIndex([3,4,1,2],4) // 1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
// findRotatedIndex([37,44,66,102,10,22],14) // -1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1

function findRotatedIndex(array, num) {
  var pivot = findPivot(array);
  // this takes in the function findPivot, which finds the pivot index
  if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
    // if the pivot is greater than 0 and the number is greater than or equal to the first index
    // in the array and the number is greater than the value at the index of the pivot minus one
    return binarySearch(array, num, 0, pivot - 1);
  } else {
    return binarySearch(array, num, pivot, array.length - 1);
  }
}

function binarySearch(array, num, start, end) {
  if (array.length === 0) return -1;
  // if the array is empty return negative one
  if (num < array[start] || num > array[end]) return -1;
  // if  num is not in array return -1

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    // calculates mid index
    if (array[mid] === num) {
      // if the mid is the num, return that index
      return mid;
    } else if (num < array[mid]) {
      // if num is less than the value of the mid
      end = mid - 1;
      // end is set to the mid -1 --array is cut in half to one index before the mid
    } else {
      start = mid + 1;
      // or it is set to the index after the mid
    }
  }
  return -1;
  // otherwise the num is not in the array
}

function findPivot(arr) {
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
  // this means there is only one element in the array
  var start = 0;
  var end = arr.length - 1;
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    // this formula returns the middle index
    if (arr[mid] > arr[mid + 1]) return mid + 1;
    // if the value of the mid is greater than the value of the mid plus 1,
    // then return the next index value in the array?
    else if (arr[start] <= arr[mid]) {
      // if the value of the start index is less than or equal to the value of the mid,
      start = mid + 1;
      // then the pivot must further down the array and we divide the array in half and the new start
      // is after the mid
    } else {
      end = mid - 1;
      // otherwise the end becomes the mid and we subtract keep subtracting one
    }
  }
}

// findRotationCount
// Write a function called findRotationCount which accepts
//  an array of distinct numbers sorted in increasing order.
//  The array has been rotated counter-clockwise n number of times.
//  Given such an array, find the value of n.
// Constraints:
// Time Complexity: O(log N)
// Examples:
// findRotationCount([15, 18, 12, 3, 6, 12]) // 2
// findRotationCount([7, 9, 11, 12, 5]) // 4
// findRotationCount([7, 9, 11, 12, 15]) // 0

function findRotationCount(arr, low = 0, high = arr.length - 1) {
  if (high < low) return 0;
  if (high === low) return low;
  // my-note--means there is only one element in array
  let mid = Math.floor((low + high) / 2);

  // Check if element (mid+1) is minimum element.
  // Consider the cases like [3, 4, 5, 1, 2]
  if (mid < high && arr[mid + 1] < arr[mid]) return mid + 1;

  // Check if mid itself is minimum element
  // my-note--this checks if mid is less than high and the middl element plus one
  // my-note---is less than the middle element---the rotation point is equal to the index of the
  // element  that is smaller than the element before it plus one
  if (mid > low && arr[mid] < arr[mid - 1]) {
    return mid;
  }

  // Decide whether we need to go to left half or
  // right half
  if (arr[high] > arr[mid]) {
    return findRotationCount(arr, low, mid - 1);
  }

  return findRotationCount(arr, mid + 1, high);
}

// findFloor
// Write a function called findFloor which accepts a sorted
// array and a value x, and returns the floor of x in the array.
//  The floor of x in an array is the largest element in the
//  array which is smaller than or equal to x. If the floor does not exist, return -1.
// Examples:
// findFloor([1,2,8,10,10,12,19], 9) // 8
// findFloor([1,2,8,10,10,12,19], 20) // 19
// findFloor([1,2,8,10,10,12,19], 0) // -1
function findFloor(arr, num, low = 0, high = arr.length - 1) {
  if (low > high) return -1;
  // uf low is greater than high than the array is empty
  if (num >= arr[high]) return arr[high];
  // if num is greater than or equal to the value of the high the we ought to return the high,
  // because that the num floored.

  let mid = Math.floor((low + high) / 2);
  // find the middle by averaging the low and the high

  if (arr[mid] === num) return arr[mid];
  // if the value of the mid is num then just return that value

  if (mid > 0 && arr[mid - 1] <= num && num < arr[mid]) {
    // if the middle index is greater than zero and the value of the mid minus 1 is less
    // than or equal to the num and num is less than the value of the mid
    return arr[mid - 1];
    // we return the value of the mid minus one
  }

  if (num < arr[mid]) {
    // if num is less than the value of the mid
    return findFloor(arr, num, low, mid - 1);
    // we set the high tomid minus one--halving the array
  }

  return findFloor(arr, num, mid + 1, high);
  // otheewise we set the low to mid plus one--halving the array
}
