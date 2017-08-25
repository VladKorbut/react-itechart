import db from './db';

const KeyStrokes = {
  create(keystrokes) {
    const insert = keystrokes.map(item => `(${item.keyCode}, '${item.duration.toFixed(4)}', '${item.interval.toFixed(4)}')`);
    console.log(`INSERT INTO keystrokes(key_code, duration, interval) VALUES ${insert.join(',')}`);
    return db.executeTransaction(`INSERT INTO keystrokes(key_code, duration, interval) VALUES ${insert.join(',')}`);
  },
};

export default KeyStrokes;
