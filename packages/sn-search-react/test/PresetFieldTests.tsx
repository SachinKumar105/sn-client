import { Select } from '@material-ui/core'
import { Query } from '@sensenet/query'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { PresetField } from '../src/Components/Fields/PresetField'

describe('Preset Fields', () => {
  configure({ adapter: new Adapter() })

  it('Should be constructed', () => {
    shallow(
      <PresetField
        fieldName="DisplayName"
        presets={[{ text: 'value1', value: new Query(q => q) }]}
        onQueryChange={() => {
          /** */
        }}
      />,
    )
  })

  it('Should be constructed with default value', () => {
    shallow(
      <PresetField
        fieldName="DisplayName"
        presets={[{ text: 'value1', value: new Query(q => q) }]}
        defaultValue="value1"
        onQueryChange={() => {
          /** */
        }}
      />,
    )
  })

  it('onQueryChange should be executed on change', done => {
    const instance = shallow(
      <PresetField
        fieldName="DisplayName"
        presets={[{ text: 'value1', value: new Query(q => q.equals('DisplayName', 'Alma')) }]}
        onQueryChange={(key, q, name) => {
          expect(key).toBe('DisplayName')
          expect(q.toString()).toBe("DisplayName:'Alma'")
          expect(name).toBe('value1')
          done()
        }}
      />,
    )
    const select = instance.find(Select)
    select.props().onChange({ target: { value: 'value1' } })
    expect(select)
  })

  it('onQueryChange should not be executed when there is no hit in presets', done => {
    const instance = shallow(
      <PresetField
        fieldName="DisplayName"
        presets={[{ text: 'value1', value: new Query(q => q) }]}
        onQueryChange={() => {
          throw Error("Shouldn't be triggered")
        }}
      />,
    )
    const select = instance.find(Select)
    select.props().onChange({ target: { value: 'value2' } })

    setTimeout(() => {
      done()
    }, 150)
  })
})
