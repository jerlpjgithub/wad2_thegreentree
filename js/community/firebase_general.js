// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, where, query } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

"https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB930wEyfKpI2gBvgAUprBKWqhcbmcKJzk",
  authDomain: "wad2thegreentree.firebaseapp.com",
  databaseURL: "https://wad2thegreentree-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2thegreentree",
  storageBucket: "wad2thegreentree.appspot.com",
  messagingSenderId: "731944801799",
  appId: "1:731944801799:web:ac8492d32f75b71ba3fca2",
  measurementId: "G-M4GNGPS1MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
// const querySnapshot = await getDocs(collection(db, 'users'));
const communities = await getDocs(collection(db, 'communities'));
const posts_collection = await getDocs(collection(db, 'posts'));


  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  // });

var communitiesList = communities.docs.map(doc => doc.data());
var postList = posts_collection.docs.map(doc => doc.data());

var comments_array = [];
var post_array = [];
var comments = query(collection(db, "comments"));
var posts = query(collection(db, "posts"));
const querySnapshot_comments = await getDocs(comments);
const querySnapshot_post = await getDocs(posts)
querySnapshot_comments.forEach((doc) => {
  var docData = doc.data();
  docData["postid"] = doc.id;
  comments_array.push(docData);
})

querySnapshot_post.forEach((doc) => {
  var docData = doc.data();
  docData["postid"] = doc.id;
  post_array.push(docData);
})



// for(comments in comments_array){
//   var post_id = comments_array[comments].postid;
//   console.log(post_id);
//   for(post in post_array){

//   }
//   }




var currentUrl = window.location.href;

var url = currentUrl.split("_");
var url = url[2].split(".");
var community_category = url[0];

var rows = "";
// for(var j of communitiesList){
//   var name = j.name;
//   if(name.toLowerCase()==community_category){
//     for(var post of post_array){
//       if(post_array[post].)
//     }
//   }
// }


  for(var j of communitiesList){
    var name = j.name;
    if(name.toLowerCase()==community_category){
        var id = j.id;
        var title = name;
        for(var i of postList){
          if(i.communityid==id){
            // var post_array = postList;
            var topic_title = i.title;
            var followercount = i.followercount;
            var description = i.desc;

            for(var post of post_array){
              if(topic_title == post.title){
                var post_id = post.postid;
              }
            }

            rows +=
            "<button id='post' type='button'><a id='postButton' href='community_comments.html?communityid="+id+"&postid="+post_id+"&posttitle="+topic_title+"'>"
            +"<h3>"+topic_title+"</h3>"
            +"<h5>Total Followers: "+followercount+"</h5>"
            +"<p id='about'>About: <br/>"+description+"<p></a></button></div>";
          }
        }
  }
}


document.getElementById("main").innerHTML += rows;
document.getElementById("category").innerText = "Topics under " + title;

const fetchData = () => {
  const app = Vue.createApp({
    data() {
      return {
        post_items: post_array,
        search: "",
      };
    },
    methods: {
      search_items() {
        if (this.search.trim() === "") {
          this.post_items = post_array;
        } else {
          const search_query = this.search.toLowerCase();
          this.post_items = this.post_items.filter(topic => topic.title.toLowerCase().includes(search_query))
        }
      }
    },
      components: {
        'item-card' : {
          props: ['topic'],
          // data() {
          //   return {
          //     showButtons: false,
          //   };
          // },
          template: `
          "<button id='post' type='button'><a id='postButton' href='community_comments.html?communityid="+id+"&posttitle="+i.title+"'>"
          "<h3>"+{{ item.name }}+"</h3>"
          "<h5>Total Followers: "+{{ followercount}} +"</h5>"
          "<p id='about'>About: <br/>"+{{ description }}+"<p></a></button></div>";
          `
        }
      }
  });
  
  app.mount("#main");
};
fetchData();



