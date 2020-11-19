<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      Answers Viewer
      <v-btn color="secondary" style="margin-left: 2em;" @click="open">Load Answers File</v-btn>
      &nbsp;
      <input
        style="display: none"
        type="file"
        ref="fileInput"
        accept=".json"
        @change="fileChosen"
      />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-card v-for="(ans, idx) in sortedAnswers" :key="idx">
              <v-card-title>Question {{ ans.question }}</v-card-title>
              <template v-if="ans.data">
                <v-card-text v-if="ans.data.shortAnswer">{{
                  ans.data.shortAnswer
                }}</v-card-text>
                <div v-if="typeof ans.data === 'string'">
                  <pre>{{ ans.data }}</pre>
                </div>
              </template>
              <template v-else>
                <v-card-text class="red--text"
                  >The answer for this question was empty</v-card-text
                >
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
function customCompare(a, b) {
  const aList = a.match(/(\d+|[^\d]+)/g);
  const bList = b.match(/(\d+|[^\d]+)/g);
  const length = Math.min(aList.length, bList.length);
  for (let i = 0; i < length; i++) {
    const aTok = aList[i];
    const bTok = bList[i];
    const aNum = Number.parseInt(aTok);
    const bNum = Number.parseInt(bTok);
    if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
      if (aNum != bNum) {
        return aNum - bNum;
      }
      if (aTok != bTok) {
        return aTok.localeCompare(bTok);
      }
    }
  }
  if (aList.length == bList.length) {
    return 0;
  }
  if (aList.length < bList.length) {
    return -1;
  }
  return 1;
}

export default {
  name: "App",
  data: () => ({
    answers: {},
  }),
  methods: {
    open() {
      this.$refs.fileInput.click();
    },
    fileChosen(ev) {
      if (ev.target.files[0]) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev2) => {
          try {
            this.loadData(JSON.parse(ev2.target.result));
          } catch (err) {
            console.log(err);
            alert("An error occurred while reading exam: " + err);
          }
        };
        reader.readAsText(file);
      }
    },
    loadData(data) {
      console.log(data);
      this.answers = data;
    },
  },
  computed: {
    sortedAnswers() {
      return Object.values(this.answers).sort((a, b) =>
        customCompare(a.question, b.question)
      );
    },
  },
};
</script>
