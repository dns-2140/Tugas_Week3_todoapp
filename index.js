const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

let todos = [
  {
    id: 1,
    title: 'Belajar JavaScript',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
  {
    id: 2,
    title: 'Mengerjakan PR',
    completed: true,
    createdAt: new Date().toLocaleString(),
    completedAt: new Date().toLocaleString(),
  },
  {
    id: 3,
    title: 'Membaca buku',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
  {
    id: 4,
    title: 'Olahraga pagi',
    completed: true,
    createdAt: new Date().toLocaleString(),
    completedAt: new Date().toLocaleString(),
  },
  {
    id: 5,
    title: 'Menonton tutorial React',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
  {
    id: 6,
    title: 'Membuat proyek kecil',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
  {
    id: 7,
    title: 'Membersihkan kamar',
    completed: true,
    createdAt: new Date().toLocaleString(),
    completedAt: new Date().toLocaleString(),
  },
  {
    id: 8,
    title: 'Belajar Laravel',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
  {
    id: 9,
    title: 'Mengatur jadwal kerja',
    completed: true,
    createdAt: new Date().toLocaleString(),
    completedAt: new Date().toLocaleString(),
  },
  {
    id: 10,
    title: 'Mencoba coding challenge',
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  },
];

const state = {
  id: 10,
};

console.log(`ini state id ${state.id}`);

function showTable() {
  const newTable = todos.map((todo) => ({
    ...todo,
    completed: todo.completed ? '✅' : '❌',
    completedAt: todo.completedAt ? todo.completedAt : ' ',
  }));
  console.table(newTable);
}

function showUnfinished() {
  console.log('='.repeat(90));
  console.log('Berikut adalah tabel yang berisikan tugas yang belum selesai:');
  const filteredTable = todos.filter((e) => e.completed === false);
  const newTable = filteredTable.map((todo) => ({
    ...todo,
    completed: todo.completed ? '✅' : '❌',
    completedAt: todo.completedAt ? todo.completedAt : ' ',
  }));

  console.table(newTable);
  showMenu();
}

function completeTask() {
  const unfinishedTasks = todos.filter((e) => e.completed === false);
  if (unfinishedTasks.length === 0) {
    console.log('🎉 Semua tugas sudah selesai! Tidak ada tugas yang tersisa.');
    return showMenu();
  }
  console.log('='.repeat(90));
  console.log('Berikut adalah tabel yang berisikan tugas yang belum selesai:');
  console.table(unfinishedTasks);
  rl.question('Masukkan ID tugas yang ingin diselesaikan:  ', (taskId) => {
    console.log(taskId);
    const task = todos.find((e) => e.id === Number(taskId));

    if (!task) {
      console.log('❌ ID tidak ditemukan. Coba lagi.');
    } else if (task.completed) {
      console.log(
        `⚠️ Tugas "${task.title}" sudah selesai sebelumnya pada ${task.completedAt}.`
      );
    } else {
      task.completed = true;
      task.completedAt = new Date().toLocaleString();
      console.log(`✅ ${task.title} telah selesai`);
    }
    showMenu();
  });
}

function deleteTask() {
  console.log('='.repeat(90));
  console.log('Berikut adalah tabel semua tugas:');
  console.table(todos);
  rl.question('Masukkan ID tugas yang ingin dihapus:  ', (taskId) => {
    console.log(taskId);
    const task = todos.find((e) => e.id === Number(taskId));

    if (!task) {
      console.log('❌ ID tidak ditemukan. Coba lagi.');
    } else {
      todos = todos.filter((todo) => todo.id !== Number(taskId));
      console.log(`🗑 ${task.title} telah dihapus`);
    }
    showMenu();
  });
}

function showMenu() {
  console.log('\n==== To-Do List ====');
  console.log('1. Tambah Tugas');
  console.log('2. Lihat Semua Tugas');
  console.log('3. Lihat Tugas Yang Belum Selesai');
  console.log('3. Selesaikan Tugas');
  console.log('4. Hapus Tugas');
  console.log('5. Keluar');
  rl.question('Pilih Menu: ', (number) => {
    switch (number) {
      case '1':
        addTodo();
        break;
      case '2':
        listTodo();
        break;
      case '3':
        showUnfinished();
        break;
      case '4':
        completeTask();
        break;
      case '5':
        deleteTask();
        break;
      case '6':
        console.log('terima kasih');
        rl.close();
        break;
      default:
        console.log('Pilihan tidak valid, coba lagi');
        showMenu();
    }
  });
}

function addTodo() {
  rl.question('Masukkan tugas baru: ', (task) => {
    if (task.trim() === '') {
      console.log('tidak boleh kosong');
    } else {
      const taskData = {
        id: state.id + 1,
        title: task,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
      };
      state.id++;
      todos.push(taskData);
      console.log('Tugas ditambahakan');
    }
    showMenu();
  });
}

function listTodo() {
  console.log('\n===Daftar Tugas===');
  if (todos.length === 0) {
    console.log('Belum ada tugas');
  } else {
    // todos.forEach((todo, index) => {
    //   console.log(`${index + 1}. ${todo}`);
    // });
    showTable();
  }
  showMenu();
}

showMenu();
