<Modal
		  visible={state.visible}
          title="添加考生信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={state.loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}>
          <div style={{width:'80%',margin:'auto'}}>
          <span>姓名<span style={{color:'red'}}>*</span></span>
          <input name="stdName" type="text" value={state.addData.stdName}  className="info-input form-control" onChange={this.handleChange}/>
          <span>监考老师<span style={{color:'red'}}>*</span></span>
          <div  >
          <input name="techName" type="text" value={state.addData.techName}   className="info-input form-control" 
         onFocus={this.handleFocus}/>
          </div>
          <span>考号<span style={{color:'red'}}>*</span></span>
          <input name="stdNum" type="text" value={state.addData.stdNum}  className="info-input form-control" onChange={this.handleChange}/>
          <span>考场号<span style={{color:'red'}}>*</span></span>
          <input name="roomNum" type="text" value={state.addData.roomNum} className="info-input form-control" onChange={this.handleChange}/>
        </div>
           <InputMulSelect defaultChecked={this.state.defaultChecked} value={this.state.teachOpts} visible={this.state.selVisible}  checked={this.state.checkState} handleClick={this.handleFocus}
           />
		</Modal>


    render(){
    console.log("propslocation:"+this.props.location.query);
    return(
      <Modal
      visible={props.visible}
          title={props.title}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={props.loading} onClick={this.props.handleOk}>
              提交
            </Button>,
          ]}>
          <div style={{width:'80%',margin:'auto'}}>
          <span>姓名<span style={{color:'red'}}>*</span></span>
          <input name="stdName" type="text" value={props.addData.stdName}  className="info-input form-control" onChange={this.props.handleChange}/>
          <span>监考老师<span style={{color:'red'}}>*</span></span>
          <div  >
          <input name="techName" type="text" value={props.addData.techName}   className="info-input form-control" 
           onFocus={this.props.handleFocus}/>
          </div>
          <span>考号<span style={{color:'red'}}>*</span></span>
          <input name="stdNum" type="text" value={props.addData.stdNum}  className="info-input form-control" onChange={this.props.handleChange}/>
          <span>考场号<span style={{color:'red'}}>*</span></span>
          <input name="roomNum" type="text" value={props.addData.roomNum} className="info-input form-control" onChange={this.props.handleChange}/>
          </div>
          <InputMulSelect  value={props.teachOpts} visible={props.selVisible}  checked={this.state.checkState} handleClick={this.props.handleFocus}
           />
    </Modal>