import Vue from 'vue'
import FormInput from './form/Input'
import FormSelect from './form/Select'
import FormText from './form/Text'
import Modal from './utils/Modal'
[
    FormInput,
    FormSelect,
    FormText,
    Modal
    
].forEach(component => Vue.component(component.name, component))