const fs = require('fs');


fs.writeFile("hello.txt", "introduction of node ", (err) => {
  if (err) throw err;
});

  fs.appendFile("hello.txt", "  Hello World", (err) => {
    if (err) throw err;

});
    fs.readFile("hello.txt", (err, data) => {
      if (err) throw err;
      console.log(data.toString());
    });

      fs.rename("hello.txt", "ayan2.txt", (err) => {
        if (err) throw err;
        console.log('File renamed successfully');
      });
   


