import Dexie from "dexie";

const db = new Dexie("timersDB");
db.version(1).stores({
  timers: "++id, name, duration, audio"
});

export default db;
