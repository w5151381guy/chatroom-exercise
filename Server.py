# -*- encoding: utf-8 -*-
import socket
import threading
from time import gmtime, strftime

mydict = dict()  
mylist = list()

class Server:
    def __init__(self, host, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock = sock
        self.sock.bind((host, port))
        self.sock.listen(5)
        print('Server', socket.gethostbyname(host), 'listening ...')
        self.mylist = list()

    def checkConnection(self):
        connection, addr = self.sock.accept()
        print('Accept a new connection', connection.getsockname(), connection.fileno())
        

        try:
            buf = connection.recv(1024).decode()
            if buf == '1':
                # start a thread for new connection
                mythread = threading.Thread(target=self.subThreadIn, args=(connection, connection.fileno()))
                mythread.setDaemon(True)
                mythread.start()

            else:
                connection.send(b'please go out!')
                connection.close()
        except:
            pass

    # send whatToSay to every except people in exceptNum
    def tellOthers(self, exceptNum, whatToSay):
        for c in self.mylist:
            if c.fileno() != exceptNum:
                try:
                    c.send(whatToSay.encode())
                except:
                    pass

    def subThreadIn(self, myconnection, connNumber):
        nickname = myconnection.recv(1024).decode()
        mydict[myconnection.fileno()] = nickname
        self.mylist.append(myconnection)
        self.tellOthers(connNumber, 'System: ' + nickname + ' in the chat room')
        while True:
            try:
                recvedMsg = myconnection.recv(1024).decode()
                if recvedMsg:
                    print(mydict[connNumber], ':', recvedMsg)  
                    self.tellOthers(connNumber, mydict[connNumber]+':'+recvedMsg)
                else:
                    pass

            except (OSError, ConnectionResetError):
                try:
                    self.mylist.remove(myconnection)
                except:
                    pass 
                self.tellOthers(connNumber, 'System: '+mydict[connNumber]+' left the chat room') 
                myconnection.close()
                return


def main():
    s = Server('localhost', 5550)
    while True:
        s.checkConnection()


if __name__ == "__main__":
    main()

