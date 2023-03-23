Absensi Siswa

```
Link ERD : https://dbdiagram.io/d/641a8249296d97641d89c928
```

students
validasi input spt biasa

transactions
- validasi input spt biasa. 
- type nya ntar dropdown. pilihan antara absent atau in
- untuk notes nya di tentukan berdasarkan waktu-nya.
1. kurang dari jam 07.30 = IN
2. kurang dari jam 08.00 = IN || Terlambat
// 3 dan 4 di hold dulu
3. kurang dari jam 14.00 = out || kecepetan
4. lebih dari jam 14.00 = out

report
menampilkan setiap data siswa untuk range wkt tertentu dgn kolom sbg berikut.
id || name || jumlah (type === in) || jumlah (type === absent)