import React from 'react'
import { Container } from 'react-bootstrap'

function Help() {
  return (
    <Container>
      <Container id="top" className="border mt-3 p-3 bg-secondary">
        {/* <a id="top"/> */}
        <p className='ps-3'><a href="#guide" className='fs-4 text-info'>User Guide</a></p>
        
        <p className='ps-3'><a href="#FAQ" className='fs-4 text-info'>FAQs</a></p>

        <div className='ps-3'>
        <p className='ps-4'><a href="#q1" className='fs-4 text-info'>Question 1</a></p>
        <p className='ps-4'><a href="#q2" className='fs-4 text-info'>Question 2</a></p>
        <p className='ps-4'><a href="#q3" className='fs-4 text-info'>Question 3</a></p>
        <p className='ps-4'><a href="#q4" className='fs-4 text-info'>Question 4</a></p>
        <p className='ps-4'><a href="#q5" className='fs-4 text-info'>Question 5</a></p>
        </div>
      </Container>
      
      <h1 className='mt-3'>User Guide</h1>
      <div id="guide" className="mt-3 p-10">

        <div className='border' style={{width: '100%', height:'80vh', textAlign:'center', flexDirection:'column', alignItems:'center'}}>
          <p style={{marginTop: '40vh'}}>Insert labelled image here</p>
        </div>
        <a href="#top">Back to top</a>
      </div>
      <hr/>
      <div id="FAQ" className="p-10">
        <h1 className='mt-3'>FAQs</h1>

        <h2 id='q1' className='mt-3'>Question 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac volutpat mauris, nec mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet ultricies ex. Nam tincidunt nec ex at dictum. Praesent finibus tristique mattis. Proin risus risus, vulputate sit amet leo ac, congue rutrum tortor. In eget condimentum tellus. Phasellus tincidunt at elit ac lacinia.

          Etiam id nunc at lorem vulputate maximus in nec massa. Quisque blandit, odio ut volutpat interdum, elit neque cursus enim, suscipit efficitur elit elit sit amet diam. Proin ut nibh cursus, commodo sapien a, ultricies sapien. Pellentesque rhoncus convallis pharetra. Duis eget nisl sed velit euismod finibus vitae sit amet nunc. Sed laoreet odio tellus, et luctus ligula rutrum eget. Etiam non ex lacus. Donec leo orci, accumsan a odio eu, sodales feugiat eros. Suspendisse sit amet dapibus diam.

          Vivamus sit amet sem eros. Sed rutrum auctor magna in elementum. Pellentesque sit amet maximus nisl. Praesent facilisis hendrerit accumsan. Integer risus erat, condimentum in fermentum lobortis, fermentum vel dolor. Ut id eros erat. Duis pharetra eros nisi, ac viverra lectus lobortis ornare. Donec interdum a est ut aliquam.

          Cras quis congue risus. Proin neque purus, blandit ac mollis ut, finibus quis erat. Sed tristique mattis semper. Suspendisse laoreet magna sed est placerat bibendum. Cras iaculis feugiat mollis. Quisque a enim eget lacus auctor porta. Sed eleifend semper massa, sit amet efficitur justo auctor at. Curabitur a eros quis metus ultrices gravida sed sed eros. Nunc dapibus, diam vel viverra ullamcorper, quam velit tristique felis, vitae consectetur leo orci id massa. Aliquam nec ornare ex. Vivamus iaculis tristique justo id posuere.

          Sed non cursus lacus. Sed lacus arcu, dignissim sit amet dapibus quis, bibendum ut massa. Etiam tincidunt, arcu quis suscipit commodo, nunc enim efficitur tellus, in tempor nisl odio vitae sem. Fusce hendrerit sem nunc, in rhoncus diam rutrum ac. Suspendisse potenti. Nam tincidunt sapien vel libero euismod elementum. Curabitur purus nulla, euismod sed justo vel, pulvinar ultrices dolor.
        </p>
        <a href="#top">Back to top</a>
        <hr/>

        <h2 id='q2' className='mt-3'>Question 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac volutpat mauris, nec mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet ultricies ex. Nam tincidunt nec ex at dictum. Praesent finibus tristique mattis. Proin risus risus, vulputate sit amet leo ac, congue rutrum tortor. In eget condimentum tellus. Phasellus tincidunt at elit ac lacinia.

          Etiam id nunc at lorem vulputate maximus in nec massa. Quisque blandit, odio ut volutpat interdum, elit neque cursus enim, suscipit efficitur elit elit sit amet diam. Proin ut nibh cursus, commodo sapien a, ultricies sapien. Pellentesque rhoncus convallis pharetra. Duis eget nisl sed velit euismod finibus vitae sit amet nunc. Sed laoreet odio tellus, et luctus ligula rutrum eget. Etiam non ex lacus. Donec leo orci, accumsan a odio eu, sodales feugiat eros. Suspendisse sit amet dapibus diam.

          Vivamus sit amet sem eros. Sed rutrum auctor magna in elementum. Pellentesque sit amet maximus nisl. Praesent facilisis hendrerit accumsan. Integer risus erat, condimentum in fermentum lobortis, fermentum vel dolor. Ut id eros erat. Duis pharetra eros nisi, ac viverra lectus lobortis ornare. Donec interdum a est ut aliquam.

          Cras quis congue risus. Proin neque purus, blandit ac mollis ut, finibus quis erat. Sed tristique mattis semper. Suspendisse laoreet magna sed est placerat bibendum. Cras iaculis feugiat mollis. Quisque a enim eget lacus auctor porta. Sed eleifend semper massa, sit amet efficitur justo auctor at. Curabitur a eros quis metus ultrices gravida sed sed eros. Nunc dapibus, diam vel viverra ullamcorper, quam velit tristique felis, vitae consectetur leo orci id massa. Aliquam nec ornare ex. Vivamus iaculis tristique justo id posuere.

          Sed non cursus lacus. Sed lacus arcu, dignissim sit amet dapibus quis, bibendum ut massa. Etiam tincidunt, arcu quis suscipit commodo, nunc enim efficitur tellus, in tempor nisl odio vitae sem. Fusce hendrerit sem nunc, in rhoncus diam rutrum ac. Suspendisse potenti. Nam tincidunt sapien vel libero euismod elementum. Curabitur purus nulla, euismod sed justo vel, pulvinar ultrices dolor.
        </p>
        <a href="#top">Back to top</a>
        <hr/>

        <h2 id='q3' className='mt-3'>Question 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac volutpat mauris, nec mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet ultricies ex. Nam tincidunt nec ex at dictum. Praesent finibus tristique mattis. Proin risus risus, vulputate sit amet leo ac, congue rutrum tortor. In eget condimentum tellus. Phasellus tincidunt at elit ac lacinia.

          Etiam id nunc at lorem vulputate maximus in nec massa. Quisque blandit, odio ut volutpat interdum, elit neque cursus enim, suscipit efficitur elit elit sit amet diam. Proin ut nibh cursus, commodo sapien a, ultricies sapien. Pellentesque rhoncus convallis pharetra. Duis eget nisl sed velit euismod finibus vitae sit amet nunc. Sed laoreet odio tellus, et luctus ligula rutrum eget. Etiam non ex lacus. Donec leo orci, accumsan a odio eu, sodales feugiat eros. Suspendisse sit amet dapibus diam.

          Vivamus sit amet sem eros. Sed rutrum auctor magna in elementum. Pellentesque sit amet maximus nisl. Praesent facilisis hendrerit accumsan. Integer risus erat, condimentum in fermentum lobortis, fermentum vel dolor. Ut id eros erat. Duis pharetra eros nisi, ac viverra lectus lobortis ornare. Donec interdum a est ut aliquam.

          Cras quis congue risus. Proin neque purus, blandit ac mollis ut, finibus quis erat. Sed tristique mattis semper. Suspendisse laoreet magna sed est placerat bibendum. Cras iaculis feugiat mollis. Quisque a enim eget lacus auctor porta. Sed eleifend semper massa, sit amet efficitur justo auctor at. Curabitur a eros quis metus ultrices gravida sed sed eros. Nunc dapibus, diam vel viverra ullamcorper, quam velit tristique felis, vitae consectetur leo orci id massa. Aliquam nec ornare ex. Vivamus iaculis tristique justo id posuere.

          Sed non cursus lacus. Sed lacus arcu, dignissim sit amet dapibus quis, bibendum ut massa. Etiam tincidunt, arcu quis suscipit commodo, nunc enim efficitur tellus, in tempor nisl odio vitae sem. Fusce hendrerit sem nunc, in rhoncus diam rutrum ac. Suspendisse potenti. Nam tincidunt sapien vel libero euismod elementum. Curabitur purus nulla, euismod sed justo vel, pulvinar ultrices dolor.
        </p>
        <a href="#top">Back to top</a>
        <hr/>

        <h2 id='q4' className='mt-3'>Question 4</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac volutpat mauris, nec mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet ultricies ex. Nam tincidunt nec ex at dictum. Praesent finibus tristique mattis. Proin risus risus, vulputate sit amet leo ac, congue rutrum tortor. In eget condimentum tellus. Phasellus tincidunt at elit ac lacinia.

          Etiam id nunc at lorem vulputate maximus in nec massa. Quisque blandit, odio ut volutpat interdum, elit neque cursus enim, suscipit efficitur elit elit sit amet diam. Proin ut nibh cursus, commodo sapien a, ultricies sapien. Pellentesque rhoncus convallis pharetra. Duis eget nisl sed velit euismod finibus vitae sit amet nunc. Sed laoreet odio tellus, et luctus ligula rutrum eget. Etiam non ex lacus. Donec leo orci, accumsan a odio eu, sodales feugiat eros. Suspendisse sit amet dapibus diam.

          Vivamus sit amet sem eros. Sed rutrum auctor magna in elementum. Pellentesque sit amet maximus nisl. Praesent facilisis hendrerit accumsan. Integer risus erat, condimentum in fermentum lobortis, fermentum vel dolor. Ut id eros erat. Duis pharetra eros nisi, ac viverra lectus lobortis ornare. Donec interdum a est ut aliquam.

          Cras quis congue risus. Proin neque purus, blandit ac mollis ut, finibus quis erat. Sed tristique mattis semper. Suspendisse laoreet magna sed est placerat bibendum. Cras iaculis feugiat mollis. Quisque a enim eget lacus auctor porta. Sed eleifend semper massa, sit amet efficitur justo auctor at. Curabitur a eros quis metus ultrices gravida sed sed eros. Nunc dapibus, diam vel viverra ullamcorper, quam velit tristique felis, vitae consectetur leo orci id massa. Aliquam nec ornare ex. Vivamus iaculis tristique justo id posuere.

          Sed non cursus lacus. Sed lacus arcu, dignissim sit amet dapibus quis, bibendum ut massa. Etiam tincidunt, arcu quis suscipit commodo, nunc enim efficitur tellus, in tempor nisl odio vitae sem. Fusce hendrerit sem nunc, in rhoncus diam rutrum ac. Suspendisse potenti. Nam tincidunt sapien vel libero euismod elementum. Curabitur purus nulla, euismod sed justo vel, pulvinar ultrices dolor.
        </p>
        <a href="#top">Back to top</a>
        <hr/>

        <h2 id='q5' className='mt-3'>Question 5</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac volutpat mauris, nec mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet ultricies ex. Nam tincidunt nec ex at dictum. Praesent finibus tristique mattis. Proin risus risus, vulputate sit amet leo ac, congue rutrum tortor. In eget condimentum tellus. Phasellus tincidunt at elit ac lacinia.

          Etiam id nunc at lorem vulputate maximus in nec massa. Quisque blandit, odio ut volutpat interdum, elit neque cursus enim, suscipit efficitur elit elit sit amet diam. Proin ut nibh cursus, commodo sapien a, ultricies sapien. Pellentesque rhoncus convallis pharetra. Duis eget nisl sed velit euismod finibus vitae sit amet nunc. Sed laoreet odio tellus, et luctus ligula rutrum eget. Etiam non ex lacus. Donec leo orci, accumsan a odio eu, sodales feugiat eros. Suspendisse sit amet dapibus diam.

          Vivamus sit amet sem eros. Sed rutrum auctor magna in elementum. Pellentesque sit amet maximus nisl. Praesent facilisis hendrerit accumsan. Integer risus erat, condimentum in fermentum lobortis, fermentum vel dolor. Ut id eros erat. Duis pharetra eros nisi, ac viverra lectus lobortis ornare. Donec interdum a est ut aliquam.

          Cras quis congue risus. Proin neque purus, blandit ac mollis ut, finibus quis erat. Sed tristique mattis semper. Suspendisse laoreet magna sed est placerat bibendum. Cras iaculis feugiat mollis. Quisque a enim eget lacus auctor porta. Sed eleifend semper massa, sit amet efficitur justo auctor at. Curabitur a eros quis metus ultrices gravida sed sed eros. Nunc dapibus, diam vel viverra ullamcorper, quam velit tristique felis, vitae consectetur leo orci id massa. Aliquam nec ornare ex. Vivamus iaculis tristique justo id posuere.

          Sed non cursus lacus. Sed lacus arcu, dignissim sit amet dapibus quis, bibendum ut massa. Etiam tincidunt, arcu quis suscipit commodo, nunc enim efficitur tellus, in tempor nisl odio vitae sem. Fusce hendrerit sem nunc, in rhoncus diam rutrum ac. Suspendisse potenti. Nam tincidunt sapien vel libero euismod elementum. Curabitur purus nulla, euismod sed justo vel, pulvinar ultrices dolor.
        </p>
        <a href="#top">Back to top</a>

      </div>
    </Container>
    
    
  )
}

export default Help