import React, {Component} from 'react';

import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';


class FormUser extends Component {

  state ={
    model: {
      nome: '',
      email: '',
      cpf: 0
    }
  };

  setValues = (e, field) => {
    const {model} = this.state;
    model[field] = e.target.value;
    this.setState({model});
  }

  create = () => {
    fetch(`http://localhost:3001/user?name=${this.state.model.nome}&email=${this.state.model.email}&cpf=${this.state.model.cpf}`)
      .then(response => response.json())
      .catch(err => console.error(err))
  }

  render(){
    return (
      <Form>
        <FormGroup>
          <Label for="name">Nome: </Label>
          <Input required id="name" name="name" type="text" onChange = {e => this.setValues(e, 'nome')} placeholder="Insira seu" onfocus="this.value='';"/>
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail: </Label>
          <Input required id="email" name="email" type="email" onChange = {e => this.setValues(e, 'email')} placeholder="Insira seu e-mail" onfocus="this.value='';"/>
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF: </Label>
          <Input required id="cpf" name="cpf" type="number" onChange = {e => this.setValues(e, 'cpf')} placeholder="Insira seu CPF" onfocus="this.value='';"/>
        </FormGroup>
        <Button type="submit" onClick = {this.create} color="primary" block>Salvar</Button>
      </Form>
    );
  }
}

class ListUser extends Component {
  state = {
    searchFiel: ''
  }
  render(){
    const {users} = this.props;
    const {searchFiel} = this.state;
    const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchFiel.toLowerCase())
      );
    return (
      
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {
            filtered.map(user => (
              <tr key={user.cpf}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
              </tr>
            ))
          }
        </tbody>
        <Input id="filter" type="search" onChange={e => this.setState({searchFiel: e.target.value})}
        />
      </Table>
      
    );
  }
}

export default class UserBox extends Component {

  Url = 'http://localhost:3001/listUser';
  Url2 = 'http://localhost:3001/user';

  state = {
    users: [],
  }

  componentDidMount(){
    fetch(this.Url)
      .then(response => response.json())
      .then(users => this.setState({users}))
      .catch(e => console.log(e));
  }

  create = (user) =>  {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };
    fetch(this.Url2, requestInfo)
      .then(response => response.json())
      .then(newUser => {
        let {users} = this.state;
        users.push(newUser);
        this.setState({users});
      })
      .catch(e => console.log(e)); 
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-6">
          <h2 className="font-weight-bold text-center">Cadastro de Usuário</h2>
          <FormUser userCreate = {this.create}/>
        </div>
        <div className="col-md-6">
          <h2 className="font-weight-bold text-center">Lista de Usuário</h2>
          <ListUser users={this.state.users}/>
        </div>
      </div>
    );
  }
}
