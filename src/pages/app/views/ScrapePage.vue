<template>
  <div class="container">
    <section class="mb-5">
      <h2 class="mb-4">데이터 붙여넣기</h2>
      <div class="form-floating mb-3 d-flex">
        <div class="d-flex align-items-center me-3">
          <label for="input">원문 입력</label>
        </div>
        <div class="flex-grow-1">
          <textarea class="form-control" placeholder="input(게시판 글 오류 수정하여 넣는 곳)" id="input"></textarea>
        </div>
      </div>
      <div class="form-floating mb-3 d-flex">
        <div class="d-flex align-items-center me-3">
          <label for="paste">수집 문장</label>
        </div>
        <div class="flex-grow-1">
          <textarea class="form-control" placeholder="paste(게시판 글 붙여넣는 곳)" id="paste"></textarea>
        </div>
      </div>
      <div class="form-floating mb-3 d-flex flex-column">
        <div class="d-flex justify-content-end mb-2 text-secondary">
          <span class="ps-1 pe-1">0</span>
          <span>|</span>
          <button class="text-button ps-1 pe-1 text-secondary">지우기</button>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success">제출하기</button>
        </div>
      </div>
    </section>
    <section>
      <div class="mb-4 d-flex justify-content-between">
        <div>
          <button type="button" class="btn btn-primary me-2">CSV 파일</button>
          <button type="button" class="btn btn-primary">제출한 글 목록</button>
        </div>
        <div>
            <input type="file" class="form-control" @change="readFile">
        </div>
      </div>
      <div class="form-floating bg-light background">
        
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup(){
    const readFile = e => {
      const file = e.target.files[0]
      console.log(file)
      const reader = new FileReader()
      reader.onload = function(e){
        // Entire file
        console.log(e.target.result)

        // By lines
        var lines = e.result.split('\n')
        for(var line = 0; line < lines.length; line++){
          console.log(lines[line])
        }
      }

      reader.readAsText(file, 'shift-jis')   
    }

    return {
      readFile
    }
  }
}
</script>

<style>
h2{
  font-size: 24px;
}

.text-button{
  border: none;
  background: none;
}

.background{
  min-height: 300px;
  border-radius: 0.25rem;
}
</style>