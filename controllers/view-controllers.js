const catchAsync = require('./../utils/catch-Async');
const AppError = require('./../utils/app-error');
const textFile =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit voluptatem sint molestiae earum ipsum repellat in adipisci excepturi nemo odio laboriosam suscipit ducimus ut, incidunt eligendi architecto at quia explicabo?';
exports.getOverview = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        data: 'data',
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      data: {
        data: error,
      },
    });
  }
};
exports.getAboutUs = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});
exports.termsAndCondition = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});
exports.privacyPolicy = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});
exports.contactUs = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});
exports.legality = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});

exports.faq = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      textFile,
    },
  });
});
