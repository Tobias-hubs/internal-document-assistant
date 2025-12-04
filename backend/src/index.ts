
const express = require("express");

const app = express(); 
app.use(express.json()); 

app.get("/", (req: import("express").Request, res: import("express").Response) => { 
    res.send("Internal Document Assistant API is running"); 
}); 

const PORT = 3001;
app.listen(3001, () => { 
    console.log("API server is running on port 3001");
});