export const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
    return  res.status(200).send({ success: stripeRes });
    }
  };