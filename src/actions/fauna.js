import faunadb, { query as q }  from 'faunadb';

const getFakeSongs = (fakeSongsArray) => {
    console.log('environment', process.env);
    let client = new faunadb.Client({
        secret: process.env.FAUNA_KEY ? process.env.FAUNA_KEY : 'fnADfHYDiiACArob60AT_JOMxaw3FiBHVbr2XbKB'
      })
      
      client.query(q.Paginate(q.Match(q.Ref("indexes/all_fake-songs"))))
      .then((ret) => {
          console.log(ret);
          ret.data.forEach((id) => {
            client.query(
                q.Get(q.Ref(q.Collection('fake-songs'), id.value.id))
              )
              .then((data) => {
                  console.log(data.data.title);
                  fakeSongsArray.push(data.data.title);
            });
          });
      })
}

export default getFakeSongs;