const Hapi = require('@hapi/hapi');
const { loadModel, predict } = require("./inference");
const { store_data } = require("./firestore");

(async () => {
  const model = await loadModel();
  console.log('model loeader!');

  const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async () => {
      return "Hello, this page is working"
    }
  })

  server.route({
    method: 'POST',
    path: '/predicts',
    handler: async (request, h) => {
      try {
        const { image } = request.payload;

        const predictions = await predict(model, image);

        const [paper, rock] = predictions;

        if (paper) {
          return { result: 'paper' };
        }

        if (rock) {
          return { result: 'rock' }
        }

        return { result: 'scissors' };
      } catch (error) {
        console.error("Error predicting", error)
        return history.response({
          error: 'Prediction failed'
        }).code(500);
      }
    },

    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/upload',
    handler: async (request, h) => {
      try {
        await store_data();
        return h.response({
          message: 'Data stored successfully'
        });
      } catch (error) {
        console.error('Error uploading', error);
        return h.response({
          error: 'Upload failed'
        }).code(500)
      }
    }
  })

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();