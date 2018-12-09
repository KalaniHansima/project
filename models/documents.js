const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const DocumentSchema = mongoose.Schema ({
    title: {
      type: String,
      required: true
    },
    version: {
      type: String,
    },
    category: {
      type: String,
      required: true
    },
    approvalStatus: {
        type: Number,
        required: true
      }
  });