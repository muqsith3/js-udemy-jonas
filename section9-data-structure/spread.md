# The Spread Operator

- apa yang dilakukan oleh spread operator?
  - yang dilakukan oleh spread operator adalah mengambil value dari array dan menulis satu persatu secara manual kedalam variabel yang telah kita tentukan.
- untuk menggunakan spread operation gunakan titik 3 kali (...namaArray).

contoh menggunakan spread

```
const arr = [1,2,3];

//tanpa spread operation
const noSpread = [1,2, arr[0], arr[1], arr[2]];

console.log(noSpread)

//dengan spread operation
const spreadArr = [1,2,...arr]

```
