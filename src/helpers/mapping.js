/* eslint-disable camelcase */
export const mapVehicle = ({
  id,
  vin,
  dealer,
  grade,
  model,
  brand,
  dealerName,
  office_ids,
}) => (
  {
    id,
    vin,
    dealer,
    grade,
    model,
    brand,
    dealerName,
    officeId: office_ids && office_ids[0] ? office_ids[0] : null,
  }
)

export const mapDealer = ({
  id,
  offices,
}) => ({
  id,
  offices,
})
