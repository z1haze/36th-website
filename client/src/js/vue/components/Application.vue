<template>
  <div class="col-12 col-xl-6" id="application-vue">
    <application-submitted v-if="submitted" />

    <form v-else action="" class="mb-6" id="application-form" ref="applicationForm">
      <div v-for="(question, questionIndex) in questions" :key="`question-${questionIndex}`" class="mb-4">

        <label class="form-label" :for="`question-${questionIndex+1}`">
          <span v-html="question.title"></span>
          <small v-if="question.optional" class="text-muted">(optional)</small>
        </label>


        <input v-if="question.type === 'text'"
               type="text" class="form-control"
               :required="!question.optional"
               :id="`question-${questionIndex+1}`"
               @input="updateAnswer($event, questionIndex)"
        />

        <textarea v-else-if="question.type === 'textarea'"
                  :required="!question.optional"
                  class="form-control"
                  rows="4"
                  :placeholder="question.placeholder"
                  :name="`question-${questionIndex+1}`"
                  :id="`question-${questionIndex+1}`"
                  @input="updateAnswer($event, questionIndex)"
        />

        <template v-else-if="question.type === 'checkbox'">
          <div v-for="(option, optionIndex) in question.options" :key="`option-${optionIndex}`" class="custom-control custom-checkbox">
            <input :id="`question-${questionIndex+1}-option-${optionIndex+1}`"
                   :required="(!question.answer || question.answer.length < question.rules.min || question.answer.length > question.rules.max) && !question.optional"
                   type="checkbox"
                   class="custom-control-input"
                   :name="`question-${questionIndex+1}-options[]`"
                   :value="option"
                   :data-min="question.rules.min || 0"
                   :data-max="question.rules.max || 0"
                   :data-missing-error="question.messages.valueMissing"
                   @change="updateAnswer($event, questionIndex)">
            <label class="custom-control-label" :for="`question-${questionIndex+1}-option-${optionIndex+1}`">
              {{ option }}</label>
          </div>
        </template>

        <select
            v-else-if="question.type === 'select'"
            :required="!question.optional"
            :name="`question-${questionIndex+1}`"
            :id="`question-${questionIndex+1}`"
            class="form-select"
        >
          <option v-if="question.placeholder" value="" :label="question.placeholder"></option>
          <option v-for="(option, optionIndex) in question.options" :key="`option-${optionIndex}`" :value="option" :label="option"/>
        </select>
      </div>

      <p class="mb-4">
        Before submitting this application, please ensure that all of your answers are the best answers that you can give,
        as they can and will have an effect on whether or not you are accepted into this unit. Please take them seriously.
      </p>

      <button class="btn btn-special">submit</button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import ApplicationSubmitted from './ApplicationSubmitted';

const {setupForm} = require('../../util/forms')

export default {
  components: {
    ApplicationSubmitted
  },

  data () {
    return {
      submitted    : false,
    }
  },

  computed: {
    ...mapState(['questions'])
  },

  mounted () {
    const form = this.$refs.applicationForm;

    setupForm(form, () => this.submitApplication());
  },

  methods: {
    updateAnswer (evt, questionIndex) {
      let val = null;

      switch (evt.type) {
        case 'change':
          const obj = this.questions[questionIndex];
          const answer = obj.answer || [];

          if (evt.target.checked) {
            answer.push(evt.target.value);
          } else {
            answer.splice(answer.indexOf(evt.target.value), 1);
          }

          val = {...obj, answer};
          break;
        default:
          val = {...this.questions[questionIndex], answer: evt.target.value};
      }

      this.$store.commit('SET', {
        obj: this.questions,
        key: questionIndex,
        val
      });
    },

    submitApplication () {
      // simulate submission of application
      setTimeout(() => {
        this.submitted = true;
      }, 250)
    }
  }
}
</script>