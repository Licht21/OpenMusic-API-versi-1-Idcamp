/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
// const mapDBToModel = require('../../utils');

class MusicsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO musics VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [id, title, year, performer, genre, duration, albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Music gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getMusics() {
    const result = await this._pool.query('SELECT id, title, performer FROM musics');
    return result.rows;
  }

  async getMusicById(id) {
    const query = {
      text: 'SELECT * FROM musics WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan');
    }
    return result.rows[0];
  }

  async editMusicById(id, {
    title, year, genre, performer, duration, albumId = null,
  }) {
    const query = {
      text: 'UPDATE musics SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING *',
      values: [title, year, performer, genre, duration, albumId, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal Memperbarui Music. Id tidak ditemukan');
    }
  }

  async deleteMusicById(id) {
    const query = {
      text: ' DELETE FROM musics WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Music gagal dihapus, Id tidak ditemukan');
    }
  }
}

module.exports = MusicsService;
