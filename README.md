# Crypter

Crypter is created as some black box that can be used in application program or website. 
It consists of few algoritms for crypting your text. 

# Algorithms
There are four different algorithms:
1. Caesar - shifts the letters alphabetically depending on the key.
2. Vigenere - uses words from the key to shift words from the text.
3. Bacon - does n0t want your key. It is quite independent, yeah...
4. Morze - does n0t want your key too. Only the text and operation.

# So what's inside?
Here is something like a diagram to show you that...
![Small diagram](https://i.ibb.co/VNcjnyx/nekogramma.png)

Here we have algorithms in wrapper - facade that manage all the data and execute the method that we want. 
When the user enter data the manager take it, send it to validating-functions, then into ciphers and finally recovers it and returns the results.
