### Problem 1

I did not know what was causing this error

```
Refused to apply style from 'http://127.0.0.1:5500/styles.css' because its MIME type ('text/html') is not a suppo

```


### Solution

I mis-spelled `style.css`


### Problem 2

how to get facebook logo from remix-icon


### Solution 

- Facebook: Use `ri-facebook-fill` or `ri-facebook-line`
- Twitter: Use `ri-twitter-fill` or `ri-twitter-line`.
- Instagram: Use `ri-instagram-fill` or `ri-instagram-line`.



### Problem 3

how do I make the first review-card align to the left while the others align in the center

### Solution

Use the `:first-child` pseudo-class to target the first .review-card

```css
.review-card:first-child {
    justify-content: flex-start; /* Align the first card to the left */
}

```


### Problem 4

how do I add bootstrap scrollspy for the body

### Solution 

``` 
<body data-bs-spy="scroll" data-bs-target=".navbar" data-bs-offset="50" tabindex="0">
```

### Problem 5

```javascript

Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.

```

###### interpretation

The error you're encountering, means Firebase is rejecting the cross-origin request due to CORS (Cross-Origin Resource Sharing) settings.

> You're trying to make a cross-origin XMLHttpRequest or fetch() call from your local development server (127.0.0.1:5500) to Firebase Storage (firebasestorage.googleapis.com), but Firebase is not configured to allow that type of request by default — especially PUT, POST, or DELETE, or when sending custom headers.
Firebase checks CORS rules before allowing a request

Firebase checks CORS rules before allowing a request, and right now:

- Your request is triggering a CORS preflight request (a special OPTIONS request sent by the browser before the actual request).

- Firebase responds to that preflight with a status other than 200 OK.

- So your browser blocks the main request.

###### solution

1. Use Firebase SDK Instead of Direct XMLHttpRequest

If you’re using pure HTML/JS, you should use Firebase's JavaScript SDK. **It handles CORS for you.**

```javascript
<!-- Include Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js"></script>
```

2. Configure CORS in Firebase Storage Manually


```javascript
// Install the Firebase CLI:
npm install -g firebase-tools
```

```javascript
// Log in
firebase login
```

```javascript
// initialise firebase
firebase init
```


