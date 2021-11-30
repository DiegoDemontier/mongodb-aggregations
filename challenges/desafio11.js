db.trips.aggregate([
  {
    $project: {
      _id: 0,
      usertype: 1,
      startTime: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$startTime",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
