import Vue from 'vue'
import FormInput from './form/Input'
import FormSelect from './form/Select'
import FormText from './form/Text'
import ColorSelector from './form/ColorSelector'
import Modal from './utils/Modal'
import Prompt from './utils/Prompt'
[
    FormInput,
    FormSelect,
    FormText,
    ColorSelector,
    
    Modal,
    Prompt,
    
].forEach(component => Vue.component(component.name, component))