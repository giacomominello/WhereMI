
var ClipSchema = new Schema({
    id: {
        type: Number,
        required: true
      },
      idP: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      purpose: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      audience: {
        type: String,
        required: true
      },
      level: {
        type: Number,
        required: true
      },
      streamUrl: {
        type: String,
        required: true
      },
});
