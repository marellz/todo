import Vue from 'vue'
import FormInput from './form/Input'
import FormSelect from './form/Select'
import FormText from './form/Text'
import ColorSelector from './form/ColorSelector'
import Modal from './utils/Modal'
[
    FormInput,
    FormSelect,
    FormText,
    ColorSelector,
    
    Modal
    
].forEach(component => Vue.component(component.name, component))