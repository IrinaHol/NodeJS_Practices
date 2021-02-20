// практичне
// - у вас є масив юзрів (до 10), з такими полями наприклад - const manOlder20 = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках
const fs = require('fs');
const path = require('path')
const userPath = path.join(__dirname)

const users = [
		{name: 'ira', gender: 'female', age: 25},
		{name: 'anna', gender: 'female', age: 100},
		{name: 'olya', gender: 'female', age: 15},
		{name: 'kolia', gender: 'male', age: 10},
		{name: 'nina', gender: 'female', age: 28},
		{name: 'oleg', gender: 'male', age: 30}

]


const func = (users) => {
		console.log(users)
		users.forEach(user => {
				const jsonUsers = JSON.stringify(user)
				fs.writeFile(path.join(__dirname, 'users', user.name, 'txt'), jsonUsers, err => {
						if (err) {
								console.log(err)
								return;
						}
				})
		})
		const myPath = path.join(__dirname, 'users');
		fs.readdir(myPath, (err, files) => {
				if (err) {
						console.log(err)
						return;
				}
				files.forEach(file => {
						fs.readFile(path.join(myPath, file), (err, data) => {
								const parseUsers = JSON.parse(data);
								console.log(parseUsers)
								if (parseUsers.gender === 'male' && parseUsers.age > 20) {
										fs.rename(path.join(__dirname, 'users', file), path.join(__dirname, 'dir', 'manOlder20', file), err => {
												if (err) {
														console.log(err)
														return;
												}
										})
								} else if (parseUsers.gender === 'female' && parseUsers.age > 20) {
										fs.rename(path.join(__dirname, 'users', file), path.join(__dirname, 'dir', 'womanOlder20', file), err => {
												if (err) {
														console.log(err)
														return;
												}
										})
								}
								else if (parseUsers.gender === 'female' && parseUsers.age < 20) {
										fs.rename(path.join(__dirname, 'users', file), path.join(__dirname, 'dir', 'womanYounger20', file), err => {
												if (err) {
														console.log(err)
														return;
												}
										})
								}
								else if (parseUsers.gender === 'male' && parseUsers.age < 20) {
										fs.rename(path.join(__dirname, 'users', file), path.join(__dirname, 'dir', 'manYounger20', file), err => {
												if (err) {
														console.log(err)
														return;
												}
										})
								}

						})
				})
		})
}
				func(users)

//
