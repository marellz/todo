import Vue from 'vue'
import FormInput from './form/Input'
import FormSelect from './form/Select'
import FormText from './form/Text'
import ColorSelector from './form/ColorSelector'
import Modal from './utils/Modal'
import Prompt from './utils/Prompt'
import DatePicker from './utils/DatePicker'
import TimePicker from './utils/TimePicker'
[
    FormInput,
    FormSelect,
    FormText,
    ColorSelector,
    
    Modal,
    Prompt,
    DatePicker,
    TimePicker,
    
].forEach(component => Vue.component(component.name, component))