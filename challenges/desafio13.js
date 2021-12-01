db.trips.aggregate([
  {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $year: "$startTime" }, 2016] },
          { $eq: [{ $month: "$startTime" }, 3] },
          { $eq: [{ $dayOfMonth: "$startTime" }, 10] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      duracaoMediaEmMinutos:
        {
          $avg:
            {
              $dateDiff:
                {
                  startDate: "$startTime",
                  endDate: "$stopTime",
                  unit: "minute",
                },
            },
        },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMediaEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
