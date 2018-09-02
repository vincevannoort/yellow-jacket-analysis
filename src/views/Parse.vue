<template>
  <div>
    <div class="file is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" name="whatsapp-text-file" @change="onFileChange">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fa fa-upload"></i>
          </span>
          <span class="file-label">
            Choose WhatsApp text file…
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "parse",
  data: () => {
    return {
      messages: []
    };
  },
  methods: {
    /** method that is called every time the file input is changed */
    onFileChange(event) {
      /** set files to a variable */
      const files = event.target.files || event.dataTransfer.files;
      /** if not file was selected, return */
      if (!files.length) return;
      /** parse whatsapp text file */
      this.parseWhatsAppConversation(files[0]);
    },

    /** responsible for parsing a file */
    parseWhatsAppConversation(file) {
      console.log(file);

      var reader = new FileReader();

      /** when file is loaded */
      reader.onload = () => {
        const messages = reader.result.split("\n");
        messages
          /** check whether the message is valid */
          .filter(message => this.isValidMessage(message))
          /** parse a single message */
          .forEach(message => {
            const parsedMessage = this.parseWhatsAppMessage(message);
            this.messages.push(parsedMessage);
            console.log(parsedMessage);
          });
      };

      /** input file to file reader */
      reader.readAsText(file);
    },

    /** responsible for checking whether a message is valid */
    isValidMessage(message) {
      return message.indexOf("[") == 0;
    },

    /** reponsible for correctly parsing a single message */
    parseWhatsAppMessage(message) {
      /** how a generic message looks: '[01-02-18 01:25:42] Vince van Noort: Hahaha'   */
      /**                               | date    | time    | name           | message */
      console.log(message);

      /** find whole name, which should start from */
      // const beginDateTimeIndex = 0;
      const endDateTimeIndex = message.indexOf("]");
      const beginNameIndex = endDateTimeIndex + 2;
      const endNameIndex = message.substr(beginNameIndex).indexOf(":");

      const name = message.substr(beginNameIndex, endNameIndex);

      /** return an object, with each component of the message splitted */
      return {
        name: name,
        message: "",
        datetime: "",
        date: "",
        time: ""
      };
    }
  }
};
</script>
