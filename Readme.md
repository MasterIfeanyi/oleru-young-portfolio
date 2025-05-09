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

