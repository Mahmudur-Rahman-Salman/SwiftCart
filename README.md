1) What is the difference between null and undefined?
Ans: 
যখন কোন ভেরিয়েবলের ঘোষনা করা হয় কিন্তু তাতে কোন মান দেওয়া হয় না, অথবা কোন ফাংশন কোন কিছু রির্টান না করলে তখন সেটা আনডিফাইন্ড হয়। 
আর Null মানে হলো এখানে কোন মান নেই।

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
Ans: 
map() ফাংশন ব্যবহার করা হয় একটি array এর প্রতিটি element থেকে নতুন মান তৈরি করে একটি নতুন array পাওয়ার জন্য। এটি মূল array পরিবর্তন করে না, বরং transform করা ডাটার একটি নতুন array return করে।
forEach() array এর প্রতিটি element এর ওপর শুধু কাজ চালায়, কিন্তু কোনো নতুন array return করে না। 

3) What is the difference between == and ===?
Ans: 
== শুধু মান (value) তুলনা করে কিন্তু === মান এবং type দুটোই একসাথে তুলনা করে।

4) What is the significance of async/await in fetching API data?
Ans: 
এটি asynchronous কোডকে এমনভাবে লেখার সুযোগ দেয় যেন কোডটি synchronous, অর্থাৎ ধাপে ধাপে চলছে। ফলে কোড পড়তে সহজ হয় এবং .then() chaining এর জটিলতা কমে যায়। 

5) Explain the concept of Scope in JavaScript (Global, Function, Block). 
Ans: 
Scope বলতে বোঝায় কোনো ভ্যারিয়েবল কোথা থেকে access করা যাবে। Global Scope-এ ঘোষণা করা ভ্যারিয়েবল পুরো ফাইল জুড়ে ব্যবহার করা যায়, Function Scope-এ থাকা ভ্যারিয়েবল শুধু ওই ফাংশনের ভেতরেই সীমাবদ্ধ থাকে এবং বাইরে থেকে access করা যায় না। Block Scope হলো {} এর ভেতরের scope, যা মূলত let এবং const এর ক্ষেত্রে প্রযোজ্য। এর ফলে কোড বেশি নিরাপদ এবং predictable হয়, কারণ অপ্রয়োজনীয়ভাবে ভ্যারিয়েবল বাইরে থেকে ব্যবহার করা যায় না।