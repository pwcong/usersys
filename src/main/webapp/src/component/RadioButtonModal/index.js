import React, { PropTypes } from 'react'
import { Modal, Radio } from 'antd'

import style from './style.css'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class RadioButtonModal extends React.Component{


	constructor(props) {
		super(props)

		this.state = {
			selected: this.props.selected
		}

		this.handleOnOk = this.handleOnOk.bind(this)
		this.handleOnCancel = this.handleOnCancel.bind(this)
		this.handleRadioChange = this.handleRadioChange.bind(this)
		
	}

	handleOnOk(){
		this.props.onOk(this.state.selected)
	}

	handleOnCancel(){
		this.props.onCancel()
	}

	handleRadioChange(e){

		this.setState({
			selected: e.target.value
		})

	}

	render(){

		return (

			<Modal 
				visible={this.props.visible}
				title={this.props.title}
				onOk={this.handleOnOk}
				onCancel={this.handleOnCancel}>

				<RadioGroup 
					className={style.group}
					onChange={this.handleRadioChange} 
					defaultValue={this.props.selected}>

					{
						this.props.source.map( item => {
							return (
								<RadioButton 
									className={style['group-item']}
									key={item.id}
									value={item.id}>
									{item.text}
								</RadioButton>
							)
						})
					}

				</RadioGroup>


			</Modal>

		)

	}

}

RadioButtonModal.propTypes = {
	source: PropTypes.array,
	selected: PropTypes.number,
	visible: PropTypes.bool,
	title: PropTypes.string,
	onOk: PropTypes.func,
	onCancel: PropTypes.func
}

RadioButtonModal.defaultProps = {
	source: [
		{id: 1, text: 'ONE'},
		{id: 2, text: 'TWO'},
		{id: 3, text: 'THREE'},
		{id: 4, text: 'FOUR'},
	],
	selected: null,
	visible: true,
	title: 'Title',
	onOk(id){
		console.log(id)
	},
	onCancel(){
		console.log('Cancel')
	}
}