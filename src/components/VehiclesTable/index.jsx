import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { getVehicles as getVehiclesAction } from '../../actions/vehicles'
import 'antd/dist/antd.css'

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
  state = {
    page: 0,
  }

  componentDidMount() {
    const { page } = this.state
    const { getVehicles } = this.props
    getVehicles(page)
  }

  handleChangePage = (page) => {
    const { pages, getVehicles } = this.props

    if (!pages[page - 1]) {
      getVehicles(page - 1)
    }

    this.setState({ page: page - 1 })
  }

  render() {
    const { pages, totalCount, loading } = this.props
    const { page } = this.state

    const pagination = {
      pageSize: PAGE_SIZE,
      total: parseInt(totalCount, 10),
      onChange: this.handleChangePage,
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
  pages: PropTypes.arrayOf({
    id: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    vin: PropTypes.string,
    dealerName: PropTypes.string,
    officeId: PropTypes.string,
    dealerData: {
      offices: PropTypes.arrayOf({
        id: PropTypes.string,
        address: PropTypes.string,
      }),
    },
  }).isRequired,
  getVehicles: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ vehicles }) => ({
  pages: vehicles.pages,
  totalCount: vehicles.totalCount,
  loading: vehicles.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getVehicles: (page) => {
    dispatch(getVehiclesAction({ page, pageSize: PAGE_SIZE }))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehiclesTable)
