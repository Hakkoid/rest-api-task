import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { getVehicles as getVehiclesAction } from '../../actions/vehicles'
import 'antd/dist/antd.css'
import { getUrlParams } from '../../helpers'

const PAGE_SIZE = 10

const COLUMNS = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    width: '15%',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    width: '15%',
  },
  {
    title: 'VIN',
    dataIndex: 'vin',
    key: 'vin',
    width: '15%',
  },
  {
    title: 'Dealer',
    dataIndex: 'dealerName',
    key: 'dealerName',
    width: '15%',
  },
  {
    title: 'Office address',
    key: 'officeAddress',
    render: (value, { dealerData, officeId }) => {
      const office = dealerData ? dealerData.offices.find(({ id }) => id === officeId) : {}

      return {
        children: office.address,
      }
    },
    width: '40%',
  },
]

class VehiclesTable extends Component {
  componentDidMount() {
    const { location, getVehicles } = this.props
    const { page = 0, pageSize = PAGE_SIZE } = getUrlParams(location)

    getVehicles(page, pageSize)
  }

  handleChangePage = (page) => {
    const { pages, getVehicles, history, location } = this.props
    const params = getUrlParams(location)
    const { pageSize } = params

    if (!pages[page - 1]) {
      getVehicles(page - 1, pageSize)
    }

    params.page = page - 1

    const strParams = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')

    history.push(`/?${strParams}`)
  }

  render() {
    const { pages, totalCount, loading, location } = this.props
    const { page = 0, pageSize = PAGE_SIZE } = getUrlParams(location)

    const pagination = {
      pageSize: Number(pageSize),
      total: totalCount,
      onChange: this.handleChangePage,
      current: Number(page) + 1,
    }

    const dataSourse = pages[page] && pages[page].map((car) => ({ ...car, key: car.id }))

    return (
      <>
        <Table
          columns={COLUMNS}
          dataSource={dataSourse}
          pagination={pagination}
          loading={loading}
        />
      </>
    )
  }
}

VehiclesTable.propTypes = {
  pages: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        model: PropTypes.string,
        brand: PropTypes.string,
        vin: PropTypes.string,
        dealerName: PropTypes.string,
        officeId: PropTypes.string,
        dealerData: PropTypes.shape({
          offices: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              address: PropTypes.string,
            }),
          ),
        }),
      }),
    ),
  ).isRequired,
  getVehicles: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = ({ vehicles }) => ({
  pages: vehicles.pages,
  totalCount: vehicles.totalCount,
  loading: vehicles.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getVehicles: (page, pageSize) => {
    dispatch(getVehiclesAction({ page, pageSize: pageSize || PAGE_SIZE }))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehiclesTable)
